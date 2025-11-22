import { v2 as cloudinary } from "cloudinary"
import prisma from "../config/prisma.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        // Validate and sanitize sizes input
        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
            if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
                return res.json({ success: false, message: "Invalid sizes format" });
            }
            // Validate each size
            parsedSizes = parsedSizes.filter(size => 
                typeof size === 'string' && 
                size.length <= 10 && 
                /^[a-zA-Z0-9]+$/.test(size)
            );
        } catch (error) {
            return res.json({ success: false, message: "Invalid sizes JSON" });
        }
        
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now().toString()
        }

        console.log(productData);

        await prisma.product.create({ data: productData })

        res.json({ success: true, message: "Product created successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await prisma.product.findMany({
            where: { isActive: true }
        });
        
        // Convert for frontend compatibility
        const formattedProducts = products.map(product => ({
            _id: String(product.id),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            subCategory: product.subCategory,
            sizes: product.sizes,
            bestseller: product.bestseller,
            date: parseInt(product.date)
        }));

        res.json({success:true,products:formattedProducts})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await prisma.product.delete({ where: { id: String(req.body.id) } })
        res.json({success:true,message:"Product deleted successfully"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await prisma.product.findUnique({ where: { id: String(productId) } })
        
        if (product) {
            const formattedProduct = {
                _id: String(product.id),
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category,
                subCategory: product.subCategory,
                sizes: product.sizes,
                bestseller: product.bestseller,
                date: parseInt(product.date)
            };
            res.json({success:true,product:formattedProduct})
        } else {
            res.json({success:false,message:"Product not found"})
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }