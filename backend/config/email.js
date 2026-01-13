import nodemailer from 'nodemailer'

const sendPriceDropEmail = async (userEmail, productName, oldPrice, newPrice) => {
    try {
        // Placeholder for real SMTP setup
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: process.env.SMTP_PORT || 587,
            auth: {
                user: process.env.SMTP_USER || 'placeholder',
                pass: process.env.SMTP_PASS || 'placeholder'
            }
        })

        const mailOptions = {
            from: '"Shoplex Alerts" <alerts@shoplex.com>',
            to: userEmail,
            subject: `🔥 Price Drop Alert: ${productName}!`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #d97706;">Good News!</h2>
                    <p>The <strong>${productName}</strong> you saved in your wishlist just dropped in price!</p>
                    <p style="font-size: 1.2em;">
                        <span style="text-decoration: line-through; color: #999;">₹${oldPrice}</span> 
                        <span style="color: #ea580c; font-weight: bold; margin-left: 10px;">₹${newPrice}</span>
                    </p>
                    <a href="${process.env.FRONTEND_URL}/product/list" style="background: #9a3412; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Shop Now</a>
                </div>
            `
        }

        await transporter.sendMail(mailOptions)
        console.log(`Price drop email sent to ${userEmail}`)

    } catch (error) {
        console.log("Error sending email:", error.message)
    }
}

export { sendPriceDropEmail }
