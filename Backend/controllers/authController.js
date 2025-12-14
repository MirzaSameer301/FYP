const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");
const { sendResetEmail } = require("../utils/email");



const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name|| !email|| !password)
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password." });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use." });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    const token = signToken(user._id);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email|| !password)
      return res
        .status(400)
        .json({ message: "Please provide email and password." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = signToken(user._id);

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword=async(req,res)=>{
    try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.RESET_SECRET, {
      expiresIn: '15m',
    });

    console.log('Calling sendResetEmail with:', user.email, typeof user.email);
  
    await sendResetEmail(user.email, resetToken);

    res.json({ message: 'Reset email sent' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.resetPassword = async (req, res) => {
   try {
    const {password} = req.body;
    const { token } = req.params;
    
    if (!token || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const user = await User.findOne({ decoded: decoded._id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
