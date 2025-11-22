import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// Fix BigInt serialization
BigInt.prototype.toJSON = function() { return this.toString() }
// import connectDB from './config/mongodb.js' // Using Prisma instead
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
// connectDB() // Using Prisma instead
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        process.env.ADMIN_URL || 'http://localhost:5174',
        'http://localhost:3000'
    ],
    credentials: true
}))

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> {
    console.log(`Shoplex Server running on http://localhost:${port}`)
    console.log('API endpoints ready!')
    console.log('BigInt serialization fixed!')
})