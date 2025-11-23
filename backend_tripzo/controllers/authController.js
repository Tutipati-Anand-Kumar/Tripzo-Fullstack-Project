// controllers/authController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOTP");
const { sendEmailOTP } = require("../utils/sendEmail");

const unverifiedUsers = {};

// ============================
// 1. Request OTP
// ============================
exports.requestOTP = async (req, res) => {
    try {
        const { email, phone } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "This email is already registered. Please log in." });
        }

        const otp = generateOTP();
        unverifiedUsers[email] = { otp, phone, expiresAt: Date.now() + 10 * 60 * 1000 };
        
        await sendEmailOTP(email, otp); 

        res.status(201).json({ msg: "OTP sent to your email. Please verify!", otp });
    } catch (err) {
        console.error("Error in requestOTP:", err);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};

// ============================
// 2. Verify OTP
// ============================
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const userData = unverifiedUsers[email];
        if (!userData) {
            return res.status(400).json({ msg: "OTP expired or not found, request a new one" });
        }

        // expiry check
        if (Date.now() > userData.expiresAt) {
            delete unverifiedUsers[email];
            return res.status(400).json({ msg: "OTP expired, please request a new one" });
        }

        if (userData.otp !== otp) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        res.json({ msg: "OTP verified successfully!" });

    } catch (err) {
        console.error("Error in verifyOTP:", err);
        res.status(500).json({ msg: "Server Error" });
    }
};

// ============================
// 3. Complete Registration
// ============================
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const userData = unverifiedUsers[email];
        if (!userData) {
            return res.status(400).json({ msg: "Invalid state. Please request a new OTP." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ msg: "Phone number already exists, please use another number" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            isVerified: true
        });

        await newUser.save();
        
        delete unverifiedUsers[email];

        res.status(201).json({ msg: "Registration completed successfully!" });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            console.error("Mongoose Validation Error:", messages);
            return res.status(400).json({ msg: "Validation failed: " + messages.join(', ') });
        }
        if (err.code === 11000 && err.keyPattern.phone) {
            return res.status(400).json({ msg: "Phone number already exists, please use another number" });
        }
        
        console.error("Error in register:", err);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};

// ============================
// Login User
// ============================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "You have to register first." }); 
        }

        if (!user.isVerified) {
            return res.status(400).json({ msg: "Please verify your email OTP first" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -otp'); 
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getMe:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ msg: "New password must be at least 6 characters." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Email is not matching, give the correct email to change the password." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.json({ msg: "Password reset successful!" });
    } catch (err) {
        console.error("Error in forgotPassword:", err);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};