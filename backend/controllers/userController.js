import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import prisma from "../config/prisma.js";
import { v2 as cloudinary } from "cloudinary";
import { sendPasswordResetEmail } from "../config/email.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Email and password required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        const dummyHash = '$2b$10$dummyhashtopreventtimingattacks';
        const userPassword = user ? user.password : dummyHash;
        const isMatch = await bcrypt.compare(password, userPassword);

        if (user && isMatch) {
            const token = createToken(user.id);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log('Login error:', error);
        return res.json({ success: false, message: "Login failed" });
    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields required" });
        }

        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const token = createToken(user.id);
        return res.json({ success: true, token });

    } catch (error) {
        console.log('Registration error:', error);
        return res.json({ success: false, message: "Registration failed" });
    }
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log('Admin login error:', error);
        return res.json({ success: false, message: "Admin login failed" });
    }
}


const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: String(userId) },
            select: { id: true, name: true, email: true, image: true, createdAt: true }
        });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, user });

    } catch (error) {
        console.log('Profile fetch error:', error);
        return res.json({ success: false, message: "Failed to fetch profile" });
    }
}


const updateUserProfile = async (req, res) => {
    try {
        const { userId, name } = req.body;
        const imageFile = req.file;

        if (!name || name.trim().length < 2) {
            return res.json({ success: false, message: "Name must be at least 2 characters" });
        }

        const dataToUpdate = { name: name.trim() };

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            dataToUpdate.image = imageUpload.secure_url;
        }

        const updatedUser = await prisma.user.update({
            where: { id: String(userId) },
            data: dataToUpdate,
            select: { id: true, name: true, email: true, image: true }
        });

        return res.json({ success: true, user: updatedUser });

    } catch (error) {
        console.log('Update profile error:', error);
        return res.json({ success: false, message: "Failed to update profile" });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.json({ success: false, message: "Please provide an email address" });
        }

        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
        if (!user) {
            return res.json({ success: false, message: "No account found with this email" });
        }

        // Generate 15-minute secure reset token
        const resetToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

        // Send email (non-blocking for resilient recovery)
        try {
            await sendPasswordResetEmail(user.email, resetUrl, user.name);
        } catch (mailErr) {
            console.log("Email dispatch failed (dev fallback active):", mailErr.message);
        }

        return res.json({
            success: true,
            message: "Password reset link sent to your email!",
            resetUrl
        });

    } catch (error) {
        console.log("Forgot password error:", error);
        return res.json({ success: false, message: "Failed to process forgot password request" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.json({ success: false, message: "Token and new password are required" });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters" });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.json({ success: false, message: "Reset link is invalid or has expired. Please request a new one." });
        }

        const user = await prisma.user.findUnique({ where: { id: String(decoded.id) } });
        if (!user) {
            return res.json({ success: false, message: "User not found or account was removed" });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        });

        return res.json({ success: true, message: "Password updated successfully! You can now log in." });

    } catch (error) {
        console.log("Reset password error:", error);
        return res.json({ success: false, message: "Failed to reset password" });
    }
};

export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, forgotPassword, resetPassword };