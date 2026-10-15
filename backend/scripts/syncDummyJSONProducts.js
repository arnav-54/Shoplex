import prisma from '../config/prisma.js';
import axios from 'axios';

const categoryMappings = [
    {
        url: 'https://dummyjson.com/products/category/mens-shirts',
        category: 'Men',
        subCategory: 'Topwear'
    },
    {
        url: 'https://dummyjson.com/products/category/womens-dresses',
        category: 'Women',
        subCategory: 'Topwear'
    },
    {
        url: 'https://dummyjson.com/products/category/tops',
        category: 'Women',
        subCategory: 'Topwear'
    },
    {
        url: 'https://dummyjson.com/products/category/mens-shoes',
        category: 'Men',
        subCategory: 'Bottomwear'
    },
    {
        url: 'https://dummyjson.com/products/category/womens-shoes',
        category: 'Women',
        subCategory: 'Bottomwear'
    }
];

// High quality Kids clothing items to ensure all 3 categories (Men, Women, Kids) are well-represented
const kidsClothingItems = [
    {
        title: "Boys Cotton Casual Polo T-Shirt",
        description: "Premium breathable 100% organic cotton polo t-shirt for kids. Gentle on delicate skin with reinforced seams.",
        price: 12.99,
        category: "Kids",
        subCategory: "Topwear",
        images: [
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Girls Floral Summer Tiered Dress",
        description: "Charming floral dress with flutter sleeves and lightweight cotton lining. Perfect for family outings and casual play.",
        price: 16.99,
        category: "Kids",
        subCategory: "Topwear",
        images: [
            "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Kids Stretch Denim Jogger Jeans",
        description: "Durable stretch denim pants featuring an elastic drawstring waistband and deep pockets for all-day active comfort.",
        price: 15.49,
        category: "Kids",
        subCategory: "Bottomwear",
        images: [
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=80"
        ]
    },
    {
        title: "Kids Quilted Hooded Winter Puffer",
        description: "Fleece-lined thermal windproof jacket designed to keep your little one cozy in cold weather. Includes reflective safety accents.",
        price: 24.99,
        category: "Kids",
        subCategory: "Winterwear",
        images: [
            "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80"
        ]
    }
];

async function syncDummyJSONProducts() {
    console.log('🚀 Starting DummyJSON Real-Time Fashion Product Sync...');
    let importedCount = 0;

    // 1. Fetch from DummyJSON categories
    for (const mapping of categoryMappings) {
        try {
            console.log(`📦 Fetching ${mapping.url}...`);
            const { data } = await axios.get(mapping.url);
            const products = data.products || [];

            for (const item of products) {
                // Check if product with same title already exists
                const existing = await prisma.product.findFirst({
                    where: { name: item.title }
                });

                if (existing) {
                    console.log(`⏩ Skipping existing product: ${item.title}`);
                    continue;
                }

                // Currency conversion: USD to reasonable INR (e.g. ₹799 - ₹2999)
                const inrPrice = Math.max(399, Math.round(item.price * 75));
                const originalPrice = Math.round(inrPrice * (1 + (item.discountPercentage || 20) / 100));

                // Clean image list (DummyJSON images array)
                const images = Array.isArray(item.images) && item.images.length > 0 
                    ? item.images 
                    : [item.thumbnail];

                await prisma.product.create({
                    data: {
                        name: item.title,
                        description: item.description,
                        price: inrPrice,
                        originalPrice: originalPrice,
                        image: images,
                        category: mapping.category,
                        subCategory: mapping.subCategory,
                        sizes: ['S', 'M', 'L', 'XL'],
                        stock: item.stock && item.stock > 0 ? item.stock : 50,
                        bestseller: item.rating >= 4.0,
                        date: String(Date.now()),
                        isActive: true
                    }
                });

                importedCount++;
                console.log(`✅ Imported: [${mapping.category}/${mapping.subCategory}] ${item.title} (₹${inrPrice})`);
            }
        } catch (error) {
            console.error(`❌ Error fetching category ${mapping.url}:`, error.message);
        }
    }

    // 2. Fetch FakeStore Men's & Women's Clothing for Winterwear Jackets
    try {
        console.log('📦 Fetching Winterwear from FakeStoreAPI...');
        const [menClothes, womenClothes] = await Promise.all([
            axios.get("https://fakestoreapi.com/products/category/men's%20clothing"),
            axios.get("https://fakestoreapi.com/products/category/women's%20clothing")
        ]);

        const extraClothing = [
            ...menClothes.data.map(p => ({ ...p, category: 'Men' })),
            ...womenClothes.data.map(p => ({ ...p, category: 'Women' }))
        ];

        for (const item of extraClothing) {
            const existing = await prisma.product.findFirst({
                where: { name: item.title }
            });
            if (existing) continue;

            const isWinter = /jacket|coat|sweater|fleece/i.test(item.title + ' ' + item.description);
            const inrPrice = Math.max(599, Math.round(item.price * 80));

            await prisma.product.create({
                data: {
                    name: item.title,
                    description: item.description,
                    price: inrPrice,
                    originalPrice: Math.round(inrPrice * 1.3),
                    image: [item.image],
                    category: item.category,
                    subCategory: isWinter ? 'Winterwear' : 'Topwear',
                    sizes: ['S', 'M', 'L', 'XL'],
                    stock: 50,
                    bestseller: item.rating?.rate >= 4.0,
                    date: String(Date.now()),
                    isActive: true
                }
            });
            importedCount++;
            console.log(`✅ Imported: [${item.category}/${isWinter ? 'Winterwear' : 'Topwear'}] ${item.title} (₹${inrPrice})`);
        }
    } catch (err) {
        console.log('Skipping FakeStore fallback:', err.message);
    }

    // 3. Add Kids clothing items
    for (const kidItem of kidsClothingItems) {
        const existing = await prisma.product.findFirst({
            where: { name: kidItem.title }
        });
        if (existing) continue;

        const inrPrice = Math.round(kidItem.price * 75);

        await prisma.product.create({
            data: {
                name: kidItem.title,
                description: kidItem.description,
                price: inrPrice,
                originalPrice: Math.round(inrPrice * 1.3),
                image: kidItem.images,
                category: kidItem.category,
                subCategory: kidItem.subCategory,
                sizes: ['S', 'M', 'L'],
                stock: 50,
                bestseller: true,
                date: String(Date.now()),
                isActive: true
            }
        });
        importedCount++;
        console.log(`✅ Imported: [Kids/${kidItem.subCategory}] ${kidItem.title} (₹${inrPrice})`);
    }

    console.log(`\n🎉 DONE! Successfully imported ${importedCount} real-time fashion products into MongoDB!`);
    process.exit(0);
}

syncDummyJSONProducts().catch(err => {
    console.error('Fatal sync error:', err);
    process.exit(1);
});
