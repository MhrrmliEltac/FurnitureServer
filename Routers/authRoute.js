const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

// Token yaratmaq funksiyası
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register route
router.post("/register", async (req, res) => {
  const { userName, email, phoneNumber, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = new User({ userName, email, phoneNumber, password });
    await newUser.save();

    const token = generateToken(newUser);

    // Tokeni cookie olaraq göndəririk
    res.cookie("token", token, {
      httpOnly: true, // JavaScript tərəfindən oxuna bilməz
      secure: process.env.NODE_ENV === "production", // Yalnız HTTPS-də işləsin
      sameSite: "None",
      maxAge: 3600000, // 1 saat müddətində
    });

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    // Tokeni cookie olaraq göndəririk
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 3600000,
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

// Protected route
router.get("/profile", (req, res) => {
  const token = req.cookies.token; // Cookie-dən token oxuyuruq
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Welcome to your profile", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Logout route (Cookie silmək üçün)
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Cookie-i silirik
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
