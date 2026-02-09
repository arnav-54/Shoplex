import prisma from "../config/prisma.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'


const currency = 'inr'
const deliveryCharge = 10


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})


const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address} = req.body;

        const orderData = {
            userId: String(userId),
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: String(Date.now())
        }

        const newOrder = await prisma.order.create({ data: orderData })

        await prisma.user.update({ where: { id: String(userId) }, data: { cartData: {} } })

        res.json({success:true,message:"Order placed successfully"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


const placeOrderStripe = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body
        const { origin } = req.headers;
        
       
        const allowedOrigins = [
            process.env.FRONTEND_URL || 'http://localhost:5173',
            'http://localhost:3000',
            'https://yourdomain.com'
        ];
        
        const validOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

        const orderData = {
            userId: String(userId),
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date: String(Date.now())
        }

        const newOrder = await prisma.order.create({ data: orderData })

        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${validOrigin}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url:  `${validOrigin}/verify?success=false&orderId=${newOrder.id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const verifyStripe = async (req,res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await prisma.order.update({ where: { id: String(orderId) }, data: { payment: true } });
            await prisma.user.update({ where: { id: String(userId) }, data: { cartData: {} } })
            res.json({success: true});
        } else {
            await prisma.order.delete({ where: { id: String(orderId) } })
            res.json({success:false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


const placeOrderRazorpay = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body

        const orderData = {
            userId: String(userId),
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date: String(Date.now())
        }

        const newOrder = await prisma.order.create({ data: orderData })

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt : newOrder.id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        
        const { userId, razorpay_order_id  } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await prisma.order.update({ where: { id: String(orderInfo.receipt) }, data: { payment: true } });
            await prisma.user.update({ where: { id: String(userId) }, data: { cartData: {} } })
            res.json({ success: true, message: "Payment completed successfully" })
        } else {
             res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



const allOrders = async (req,res) => {

    try {
        
        const orders = await prisma.order.findMany({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await prisma.order.findMany({ where: { userId: String(userId) } })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await prisma.order.update({ where: { id: String(orderId) }, data: { status } })
        res.json({success:true,message:'Order status updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}