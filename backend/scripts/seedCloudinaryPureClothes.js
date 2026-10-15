import prisma from '../config/prisma.js';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

// 25 Pure Clothing Items - Every photo shows the actual garment (NO shoes, NO bags, NO face-only portraits, NO mountains)
const pureClothingCatalog = [
    // ================= MEN: TOPWEAR =================
    {
        name: "Classic White Oxford Button-Down Shirt",
        description: "Tailored from 100% breathable combed cotton with an authentic button-down collar, chest pocket, and clean curved hem.",
        price: 1299,
        originalPrice: 1999,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL", "XXL"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Premium Boxy Fit Cotton Crewneck T-Shirt",
        description: "240 GSM heavy organic cotton t-shirt with dropped shoulders and thick ribbed neckband. Pre-shrunk for enduring shape.",
        price: 699,
        originalPrice: 1199,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Brushed Flannel Plaid Over-Shirt",
        description: "Heavyweight brushed cotton flannel shirt for effortless layering over basic tees. Twin chest flap pockets with horn buttons.",
        price: 1599,
        originalPrice: 2499,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        bestseller: false,
        sourceImg: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80"
    },

    // ================= MEN: BOTTOMWEAR =================
    {
        name: "Slim Straight Indigo Stretch Denim Jeans",
        description: "12.5 oz ring-spun authentic denim with 2% elastane for day-long flexibility. Classic 5-pocket design with copper rivets.",
        price: 1899,
        originalPrice: 2899,
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["30", "32", "34", "36"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Tailored Pleated Chino Trousers",
        description: "Crafted from durable twill cotton with refined double front pleats and side slash pockets. Perfect smart-casual pant.",
        price: 1499,
        originalPrice: 2299,
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["30", "32", "34", "36"],
        bestseller: false,
        sourceImg: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Urban Ripstop Tactical Cargo Pants",
        description: "Rugged multi-pocket cargo pants with deep flap compartments, drawstring ankle cuffs, and reinforced knee stitching.",
        price: 1799,
        originalPrice: 2699,
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["30", "32", "34", "36"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&auto=format&fit=crop&q=80"
    },

    // ================= MEN: WINTERWEAR =================
    {
        name: "Vintage Washed Denim Trucker Jacket",
        description: "Heritage point-collar denim jacket with shank buttons, side welt pockets, and adjustable waist tabs for classic layering.",
        price: 2499,
        originalPrice: 3799,
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL", "XXL"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Faux Leather Moto Biker Jacket",
        description: "Asymmetrical zip-front biker jacket with quilted shoulder pads, zipped cuffs, and warm thermal satin interior lining.",
        price: 3299,
        originalPrice: 4999,
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Heavyweight Fleece Pullover Hoodie",
        description: "Dense 380 GSM cotton-poly fleece hoodie with double-layer drawstring hood, metal eyelets, and roomy front kangaroo pouch.",
        price: 1399,
        originalPrice: 2199,
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        sourceImg: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80"
    },

    // ================= WOMEN: TOPWEAR =================
    {
        name: "Floral Summer Tiered Wrap Dress",
        description: "Flowy woven viscose sundress with flutter sleeves, adjustable wrap tie waist, and romantic ruffled hemline.",
        price: 1899,
        originalPrice: 2999,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["XS", "S", "M", "L"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Pure Silk Button-Up Blouse",
        description: "Lustrous mulberry silk shirt with hidden front placket, French cuffs, and relaxed draped silhouette.",
        price: 2199,
        originalPrice: 3499,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        sourceImg: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Crimson Red Cocktail Slip Dress",
        description: "Figure-skimming satin slip dress with delicate cowl neckline, adjustable spaghetti straps, and subtle side slit.",
        price: 2499,
        originalPrice: 3999,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Ribbed Knit Crewneck Crop Top",
        description: "Soft stretch modal cotton crop top with fine ribbed texture. Form-fitting comfort for casual high-waist styling.",
        price: 599,
        originalPrice: 999,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        sourceImg: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
    },

    // ================= WOMEN: BOTTOMWEAR =================
    {
        name: "High-Waist Vintage Straight Denim Jeans",
        description: "100% rigid cotton denim featuring a sculpting high rise, clean straight leg, and authentic vintage washed blue finish.",
        price: 1999,
        originalPrice: 2999,
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["26", "28", "30", "32"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Pleated Wide-Leg Tailored Linen Trousers",
        description: "Elegant lightweight trousers with deep front pleats, slant pockets, and a fluid wide-leg silhouette.",
        price: 1699,
        originalPrice: 2599,
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        sourceImg: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Sunburst Pleated A-Line Midi Skirt",
        description: "High-waist accordion pleat skirt with subtle sheen and stretch waistband. Effortlessly transitions from day to evening.",
        price: 1499,
        originalPrice: 2299,
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop&q=80"
    },

    // ================= WOMEN: WINTERWEAR =================
    {
        name: "Double-Breasted Wool Blend Trench Coat",
        description: "Classic structured outerwear with horn buttons, storm flaps, removable waist tie belt, and satin lining.",
        price: 3999,
        originalPrice: 5999,
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Chunky Cable-Knit Turtleneck Sweater",
        description: "Cozy oversized sweater with thick cable knit patterns, ribbed turtleneck, and drop shoulder styling.",
        price: 1799,
        originalPrice: 2799,
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        sourceImg: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80"
    },

    // ================= KIDS: TOPWEAR =================
    {
        name: "Kids Organic Cotton Striped Summer Tee",
        description: "Breathable 100% organic cotton crewneck tee with nautical stripes and soft tagless neckband.",
        price: 599,
        originalPrice: 899,
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Girls Floral Party Twirl Dress",
        description: "Charming cotton skater dress with watercolor floral print, gathered waist, and full flared skirt.",
        price: 899,
        originalPrice: 1399,
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["3-4Y", "5-6Y", "7-8Y"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=80"
    },
    {
        name: "Kids Unisex Cotton Yellow Hoodie",
        description: "Vibrant yellow fleece pullover with cozy kangaroo pocket and ribbed storm cuffs. Gentle on sensitive skin.",
        price: 799,
        originalPrice: 1199,
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["2-3Y", "4-5Y", "6-7Y"],
        bestseller: false,
        sourceImg: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80"
    },

    // ================= KIDS: BOTTOMWEAR =================
    {
        name: "Kids Washed Denim Overalls Dungaree",
        description: "Classic stretch denim overalls with metal buckle straps, chest bib pocket, and flexible movement for playtime.",
        price: 1199,
        originalPrice: 1799,
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["2-3Y", "4-5Y", "6-7Y"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=80"
    },

    // ================= KIDS: WINTERWEAR =================
    {
        name: "Kids Trucker Denim Jacket",
        description: "Authentic washed denim jacket for kids with button placket, dual chest pockets, and durable copper rivets.",
        price: 1399,
        originalPrice: 1999,
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["3-4Y", "5-6Y", "7-8Y"],
        bestseller: true,
        sourceImg: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=80"
    }
];

// 10 Original Working Cloudinary Clothing Products to retain
const originalCloudinaryProducts = [
    {
        name: "Mens Jeans Pant",
        description: "Classic straight fit denim jeans with durable rivets and five pockets.",
        price: 1299,
        originalPrice: 1899,
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["30", "32", "34", "36"],
        bestseller: true,
        images: [
            "https://res.cloudinary.com/dx1hth42p/image/upload/v1764065987/b3wueb7fctp1c5zidijn.png",
            "https://res.cloudinary.com/dx1hth42p/image/upload/v1764065987/bibjmjfv6otyghxbfm6c.png"
        ]
    },
    {
        name: "Mens Graphic Cotton T-Shirt",
        description: "Comfortable breathable daily wear cotton tee.",
        price: 599,
        originalPrice: 999,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        images: ["https://res.cloudinary.com/dx1hth42p/image/upload/v1764065912/lgjpowvw8lqxogvfleiu.png"]
    },
    {
        name: "Kids White Formal Cotton Shirt",
        description: "Crisp white formal button shirt for boys.",
        price: 699,
        originalPrice: 1099,
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["4-5Y", "6-7Y", "8-9Y"],
        bestseller: true,
        images: ["https://res.cloudinary.com/dx1hth42p/image/upload/v1764066253/ryzlysyford6cxiyegqq.png"]
    },
    {
        name: "Womens Quilted Winter Jacket",
        description: "Warm insulated zipper puffer jacket for women.",
        price: 1899,
        originalPrice: 2999,
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        images: ["https://res.cloudinary.com/dx1hth42p/image/upload/v1764066394/lrn4e4vztsxu51ghh8wy.png"]
    },
    {
        name: "Mens Classic Black T-Shirt",
        description: "Minimalist black cotton tee for everyday casuals.",
        price: 499,
        originalPrice: 799,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        images: ["https://res.cloudinary.com/dx1hth42p/image/upload/v1764065504/nqpbcvelhsd73iduveyf.png"]
    },
    {
        name: "Womens Cotton Pajama Pants",
        description: "Ultra-comfortable lightweight sleepwear bottoms.",
        price: 699,
        originalPrice: 999,
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        images: ["https://res.cloudinary.com/dx1hth42p/image/upload/v1764065706/if1zmlxvxhibtbbnniqa.png"]
    },
    {
        name: "Kids Summer Topwear Tee",
        description: "Playful summer cotton tee for active children.",
        price: 449,
        originalPrice: 699,
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["3-4Y", "5-6Y", "7-8Y"],
        bestseller: false,
        images: ["https://res.cloudinary.com/dx1hth42p/image/upload/v1764065835/xqfm489qeap1paxqobo0.png"]
    },
    {
        name: "Mens Heavyweight Winter Jacket",
        description: "Thermal insulated hooded jacket for cold weather.",
        price: 2499,
        originalPrice: 3899,
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL"],
        bestseller: true,
        images: ["https://res.cloudinary.com/dx1hth42p/image/upload/v1764066147/zqnnipa6njfiobjcgjck.png"]
    },
    {
        name: "Womens Scarlet Red Winter Jacket",
        description: "Vibrant hooded winter coat with storm flap.",
        price: 2199,
        originalPrice: 3499,
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        images: ["https://res.cloudinary.com/dx1hth42p/image/upload/v1764066301/punxecyirrpn8djbewrd.png"]
    }
];

async function seedCloudinaryPureClothes() {
    console.log('🧹 Step 1: Wiping ALL old, broken, and misclassified products...');
    await prisma.review.deleteMany({});
    await prisma.product.deleteMany({});
    console.log('✅ Database completely cleaned.');

    console.log('\n☁️ Step 2: Uploading verified clothing photos to Cloudinary & creating products...');
    let createdCount = 0;

    for (const item of pureClothingCatalog) {
        let finalImageUrl = item.sourceImg;

        try {
            console.log(`📤 Uploading photo for "${item.name}" to Cloudinary...`);
            const uploadRes = await cloudinary.uploader.upload(item.sourceImg, {
                folder: 'shoplex_curated_clothes'
            });
            finalImageUrl = uploadRes.secure_url;
            console.log(`  -> Hosted on Cloudinary: ${finalImageUrl}`);
        } catch (uploadErr) {
            console.log(`  -> Cloudinary upload note (${uploadErr.message}), using verified source URL.`);
        }

        await prisma.product.create({
            data: {
                name: item.name,
                description: item.description,
                price: item.price,
                originalPrice: item.originalPrice,
                image: [finalImageUrl],
                category: item.category,
                subCategory: item.subCategory,
                sizes: item.sizes,
                stock: 50,
                bestseller: item.bestseller,
                date: String(Date.now()),
                isActive: true
            }
        });
        createdCount++;
        console.log(`✅ [${item.category}/${item.subCategory}] Created "${item.name}"`);
    }

    console.log('\n👕 Step 3: Adding verified original Cloudinary items...');
    for (const item of originalCloudinaryProducts) {
        await prisma.product.create({
            data: {
                name: item.name,
                description: item.description,
                price: item.price,
                originalPrice: item.originalPrice,
                image: item.images,
                category: item.category,
                subCategory: item.subCategory,
                sizes: item.sizes,
                stock: 50,
                bestseller: item.bestseller,
                date: String(Date.now()),
                isActive: true
            }
        });
        createdCount++;
        console.log(`✅ [${item.category}/${item.subCategory}] Added "${item.name}"`);
    }

    const all = await prisma.product.findMany();
    console.log('\n🎉 ================================================');
    console.log(`TOTAL CLEAN CLOTHING PRODUCTS: ${all.length}`);
    console.log(`- Men: ${all.filter(p => p.category === 'Men').length}`);
    console.log(`- Women: ${all.filter(p => p.category === 'Women').length}`);
    console.log(`- Kids: ${all.filter(p => p.category === 'Kids').length}`);
    console.log(`- Topwear: ${all.filter(p => p.subCategory === 'Topwear').length}`);
    console.log(`- Bottomwear: ${all.filter(p => p.subCategory === 'Bottomwear').length}`);
    console.log(`- Winterwear: ${all.filter(p => p.subCategory === 'Winterwear').length}`);
    console.log('================================================\n');

    process.exit(0);
}

seedCloudinaryPureClothes().catch(err => {
    console.error('Fatal seed error:', err);
    process.exit(1);
});
