const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   REGISTER USER (SIGNUP)
========================= */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    /* 🔐 VALIDATION START */
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    if (!["admin", "staff"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }
    /* 🔐 VALIDATION END */

    // 1️⃣ Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "Account already exists. Please login.",
      });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 4️⃣ Generate token (auto-login)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Send response
    res.status(201).json({
      token,
      name: user.name,
      role: user.role,
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   LOGIN USER
========================= */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* 🔐 VALIDATION START */
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    /* 🔐 VALIDATION END */

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
        type: "NO_USER",
      });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        type: "WRONG_PASSWORD",
      });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Send response
    res.json({
      token,
      name: user.name,
      role: user.role,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
