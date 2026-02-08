import prisma from "../config/prisma.js"

// Get comprehensive analytics for admin dashboard
const getAnalytics = async (req, res) => {
    try {
        // Fetch all data needed
        const allOrders = await prisma.order.findMany()
        const products = await prisma.product.findMany()

        // 1. Total Revenue and Order Count
        const paidOrders = allOrders.filter(o => o.payment === true)
        const totalRevenue = paidOrders.reduce((acc, order) => acc + order.amount, 0)
        const totalOrders = allOrders.length

        // 2. Revenue Over Time (Last 7 days)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const recentPaidOrders = paidOrders.filter(o => new Date(o.createdAt) >= sevenDaysAgo).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

        const revenueData = {}
        recentPaidOrders.forEach(order => {
            const date = order.createdAt.toISOString().split('T')[0]
            revenueData[date] = (revenueData[date] || 0) + order.amount
        })

        const formattedRevenueData = Object.keys(revenueData).map(date => ({
            date,
            revenue: revenueData[date]
        }))

        // 3. Top Selling Products
        const productSales = {}
        allOrders.forEach(order => {
            // Handle items whether it's an array or parsed object
            let items = order.items
            if (typeof items === 'string') {
                try { items = JSON.parse(items) } catch (e) { }
            }
            if (Array.isArray(items)) {
                items.forEach(item => {
                    if (item.name && item.quantity) {
                        productSales[item.name] = (productSales[item.name] || 0) + item.quantity
                    }
                })
            }
        })

        const hotItems = Object.entries(productSales)
            .map(([name, sales]) => ({ name, sales }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5)

        // 4. Inventory Health (Low stock)
        const lowStockItems = products.filter(p => p.stock < 10)

        // 5. Order Status Distribution
        const statusDistribution = allOrders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1
            return acc
        }, {})

        res.json({
            success: true,
            data: {
                summary: {
                    totalRevenue,
                    totalOrders,
                    activeProducts: products.length
                },
                revenueOverTime: formattedRevenueData,
                hotItems,
                lowStockItems,
                statusDistribution
            }
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { getAnalytics }
