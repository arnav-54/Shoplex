import prisma from '../config/prisma.js';

// 100% Pure Clothes Catalog with high-quality garment photography (NO shoes, NO bags, NO face-only portraits)
const curatedClothing = [
    // ================= MEN: TOPWEAR =================
    {
        name: "Classic Oxford Cotton Button-Down Shirt",
        description: "Tailored from premium breathable 100% combed cotton. Features an authentic button-down collar, chest pocket, and curved hem for casual or smart-casual wear.",
        price: 1499,
        originalPrice: 2499,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL", "XXL"],
        bestseller: true,
        images: [
            "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
            "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/2.webp"
        ]
    },
    {
        name: "Heavyweight Boxy Fit Crewneck T-Shirt",
        description: "240 GSM organic cotton t-shirt with dropped shoulders and a dense ribbed collar. Pre-shrunk fabric ensures long-lasting durability.",
        price: 899,
        originalPrice: 1499,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        images: [
            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
        ]
    },
    {
        name: "Vintage Plaid Flannel Casual Shirt",
        description: "Brushed heavyweight cotton flannel shirt offering cozy warmth and effortless layering over basic tees. Dual buttoned chest flap pockets.",
        price: 1899,
        originalPrice: 2899,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        bestseller: false,
        images: [
            "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp"
        ]
    },
    {
        name: "Summer Linen Short-Sleeve Resort Shirt",
        description: "Lightweight European flax linen shirt featuring a relaxed camp collar. Keeps you cool during hot summer days with effortless drape.",
        price: 1299,
        originalPrice: 1999,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        images: [
            "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp"
        ]
    },
    {
        name: "Casual Slim Fit Striped Dress Shirt",
        description: "Crisp cotton blend shirt with micro-stripe detailing and adjustable button cuffs. Perfect under blazers or worn solo.",
        price: 1399,
        originalPrice: 2199,
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        images: [
            "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
        ]
    },

    // ================= MEN: BOTTOMWEAR =================
    {
        name: "Raw Indigo Slim Fit Stretch Denim Jeans",
        description: "Authentic 12.5 oz ring-spun denim with 2% elastane for flexible movement. Classic 5-pocket styling with copper rivets and custom leather patch.",
        price: 2199,
        originalPrice: 3499,
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["30", "32", "34", "36"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Pleated Relaxed Fit Chino Trousers",
        description: "Crafted from durable cotton twill with subtle double front pleats and side slash pockets. The modern silhouette for smart workwear.",
        price: 1799,
        originalPrice: 2699,
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["30", "32", "34", "36"],
        bestseller: false,
        images: [
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Urban Tactical Multi-Pocket Cargo Pants",
        description: "Rugged ripstop utility pants with 6 reinforced pockets, drawstring cuffs, and articulated knees for active street styling.",
        price: 1999,
        originalPrice: 2999,
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["30", "32", "34", "36"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80"
        ]
    },

    // ================= MEN: WINTERWEAR =================
    {
        name: "Rugged Cotton Canvas Trucker Jacket",
        description: "Heavy-duty canvas jacket with warm flannel body lining, corduroy collar, and heavy brass zipper. Built to withstand chilly conditions.",
        price: 3299,
        originalPrice: 4999,
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL", "XXL"],
        bestseller: true,
        images: [
            "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
        ]
    },
    {
        name: "Tailored Wool Blend Overcoat",
        description: "Sophisticated longline wool coat featuring notch lapels, structured shoulders, and deep welt pockets. The essential winter staple.",
        price: 4499,
        originalPrice: 6999,
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["M", "L", "XL"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Classic Faux Leather Moto Biker Jacket",
        description: "Sleek asymmetric zip front leather jacket with quilted shoulder panels and matte black hardware. Timeless rebel style.",
        price: 3799,
        originalPrice: 5499,
        category: "Men",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        images: [
            "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&auto=format&fit=crop&q=80"
        ]
    },

    // ================= WOMEN: TOPWEAR =================
    {
        name: "Corset Waist Floral Tiered Midi Dress",
        description: "Feminine midi dress with a structured smocked bodice, sweetheart neckline, and flowy tiered skirt. Breathable viscose fabric.",
        price: 2499,
        originalPrice: 3899,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["XS", "S", "M", "L"],
        bestseller: true,
        images: [
            "https://cdn.dummyjson.com/product-images/womens-dresses/girl-summer-dress/1.webp"
        ]
    },
    {
        name: "Casual Ribbed Boat Neck Fitted Top",
        description: "Soft stretch modal knit top featuring an elegant wide boat neckline and clean finished cuffs. Ideal for daily capsule layering.",
        price: 799,
        originalPrice: 1299,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        images: [
            "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"
        ]
    },
    {
        name: "Elegant Black Evening Gown Dress",
        description: "Floor-length evening gown with a flattering ruched waist, side slit, and premium flowing crepe fabric. Perfect for special occasions.",
        price: 4999,
        originalPrice: 7999,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        images: [
            "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp"
        ]
    },
    {
        name: "Pastel Blue Flared Summer Frock",
        description: "Lightweight A-line summer frock with flutter sleeves, tie-back ribbon detail, and breathable cotton lining.",
        price: 1699,
        originalPrice: 2599,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        images: [
            "https://cdn.dummyjson.com/product-images/womens-dresses/blue-frock/1.webp"
        ]
    },
    {
        name: "Tartan Plaid A-Line Smock Dress",
        description: "Heritage check pattern dress with elasticated puff sleeves and a roomy empire cut. Modern vintage chic.",
        price: 1999,
        originalPrice: 2999,
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        images: [
            "https://cdn.dummyjson.com/product-images/womens-dresses/tartan-dress/1.webp"
        ]
    },

    // ================= WOMEN: BOTTOMWEAR =================
    {
        name: "Vintage High-Waisted Straight Leg Jeans",
        description: "Non-stretch 100% authentic cotton denim featuring an ultra-flattering high rise, classic straight leg, and vintage medium wash.",
        price: 2299,
        originalPrice: 3499,
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["26", "28", "30", "32"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Flowy Wide-Leg Tailored Linen Trousers",
        description: "Elegant high-rise palazzo pants crafted from breathable linen-viscose blend. Deep front pleats and comfortable half-elastic back waist.",
        price: 1899,
        originalPrice: 2899,
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Pleated A-Line Midi Accordion Skirt",
        description: "Sophisticated sunburst accordion pleats with a subtle metallic sheen. Elasticized waistband ensures a comfortable, flattering fit.",
        price: 1599,
        originalPrice: 2499,
        category: "Women",
        subCategory: "Bottomwear",
        sizes: ["S", "M", "L"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=80"
        ]
    },

    // ================= WOMEN: WINTERWEAR =================
    {
        name: "Double-Breasted Wool Blend Trench Coat",
        description: "Timeless silhouette with storm flaps, removable waist belt, epaulets, and horn buttons. Fully lined in silky satin for smooth layering.",
        price: 4799,
        originalPrice: 7299,
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Removable Hooded Faux Leather Biker Jacket",
        description: "Versatile moto jacket with a zip-out French terry knit hood and bib. Side zip pockets and quilted shoulder detailing.",
        price: 2999,
        originalPrice: 4499,
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L"],
        bestseller: false,
        images: [
            "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
        ]
    },
    {
        name: "3-in-1 Weatherproof Winter Parka Jacket",
        description: "Windproof and water-resistant shell paired with a detachable thermal fleece lining. Multi-pocket design for cold adventures.",
        price: 3899,
        originalPrice: 5999,
        category: "Women",
        subCategory: "Winterwear",
        sizes: ["S", "M", "L", "XL"],
        bestseller: false,
        images: [
            "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
        ]
    },

    // ================= KIDS: TOPWEAR =================
    {
        name: "Kids Organic Cotton Striped Summer Tee",
        description: "Ultra-soft 100% GOTS organic cotton t-shirt with classic yarn-dyed nautical stripes. Tagless neckline prevents scratching on delicate skin.",
        price: 699,
        originalPrice: 1099,
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Girls Floral Party Twirl Dress",
        description: "Delightful cotton skater dress featuring cheerful watercolor floral print, empire waist, and gathered flare skirt made for twirling.",
        price: 1199,
        originalPrice: 1799,
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["3-4Y", "5-6Y", "7-8Y"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Kids Unisex Yellow Cotton Pullover Hoodie",
        description: "Vibrant mustard-yellow fleece hoodie with a cozy kangaroo pocket and ribbed storm cuffs. Gentle and warm for school or play.",
        price: 999,
        originalPrice: 1499,
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
        bestseller: false,
        images: [
            "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80"
        ]
    },

    // ================= KIDS: BOTTOMWEAR =================
    {
        name: "Kids Classic Washed Denim Overalls Dungaree",
        description: "Timeless denim dungarees with adjustable buckle straps, chest bib pocket, and flexible stretch denim for crawling and playing.",
        price: 1499,
        originalPrice: 2299,
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["2-3Y", "4-5Y", "6-7Y"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Kids Active Stretch Drawstring Joggers",
        description: "Comfy brushed cotton-terry joggers with an elastic waistband, contrast drawcord, and reinforced knee patches.",
        price: 799,
        originalPrice: 1199,
        category: "Kids",
        subCategory: "Bottomwear",
        sizes: ["3-4Y", "5-6Y", "7-8Y"],
        bestseller: false,
        images: [
            "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80"
        ]
    },

    // ================= KIDS: WINTERWEAR =================
    {
        name: "Kids Vintage Trucker Denim Jacket",
        description: "Authentic washed denim jacket tailored for kids with metal shank buttons, chest flap pockets, and contrast amber stitching.",
        price: 1699,
        originalPrice: 2499,
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
        bestseller: true,
        images: [
            "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=80"
        ]
    },
    {
        name: "Kids Cable-Knit Chunky Wool Sweater",
        description: "Thick textured cable-knit sweater made from ultra-soft non-itchy acrylic-wool blend. Snug crewneck keeps chilly winter breeze out.",
        price: 1399,
        originalPrice: 2099,
        category: "Kids",
        subCategory: "Winterwear",
        sizes: ["2-3Y", "4-5Y", "6-7Y"],
        bestseller: false,
        images: [
            "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?w=800&auto=format&fit=crop&q=80"
        ]
    }
];

async function seedPureClothes() {
    console.log('🧹 Step 1: Removing all non-clothing items (shoes, backpacks, slippers)...');
    
    // Delete non-clothing items
    const nonClothingKeywords = ['shoe', 'sneaker', 'cleat', 'slipper', 'heel', 'backpack', 'foldsack'];
    for (const kw of nonClothingKeywords) {
        const deleted = await prisma.product.deleteMany({
            where: {
                OR: [
                    { name: { contains: kw, mode: 'insensitive' } },
                    { description: { contains: kw, mode: 'insensitive' } }
                ]
            }
        });
        if (deleted.count > 0) {
            console.log(`🗑️ Removed ${deleted.count} items matching "${kw}"`);
        }
    }

    console.log('\n👗 Step 2: Seeding 100% Pure High-Definition Apparel Collection...');
    let addedCount = 0;
    let updatedCount = 0;

    for (const item of curatedClothing) {
        const existing = await prisma.product.findFirst({
            where: { name: item.name }
        });

        if (existing) {
            await prisma.product.update({
                where: { id: existing.id },
                data: {
                    price: item.price,
                    originalPrice: item.originalPrice,
                    image: item.images,
                    category: item.category,
                    subCategory: item.subCategory,
                    sizes: item.sizes,
                    stock: 50,
                    bestseller: item.bestseller,
                    isActive: true
                }
            });
            updatedCount++;
            console.log(`🔄 Updated: [${item.category}/${item.subCategory}] ${item.name}`);
        } else {
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
            addedCount++;
            console.log(`✨ Added: [${item.category}/${item.subCategory}] ${item.name}`);
        }
    }

    // Verify all products in database have valid stock and categories
    const allProducts = await prisma.product.findMany();
    console.log(`\n🎉 Verification Summary:`);
    console.log(`- Total live pure clothing items: ${allProducts.length}`);
    console.log(`- Men's clothes: ${allProducts.filter(p => p.category === 'Men').length}`);
    console.log(`- Women's clothes: ${allProducts.filter(p => p.category === 'Women').length}`);
    console.log(`- Kids' clothes: ${allProducts.filter(p => p.category === 'Kids').length}`);
    console.log(`- Topwear: ${allProducts.filter(p => p.subCategory === 'Topwear').length}`);
    console.log(`- Bottomwear: ${allProducts.filter(p => p.subCategory === 'Bottomwear').length}`);
    console.log(`- Winterwear: ${allProducts.filter(p => p.subCategory === 'Winterwear').length}`);

    process.exit(0);
}

seedPureClothes().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
});
