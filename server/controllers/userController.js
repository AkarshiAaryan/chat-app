import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.json({ success: false, message: "Account already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({ fullName, email, password: hashed, bio });
    const token = generateToken(newUser._id);

    return res.json({ success: true, userData: newUser, token, message: "Account created successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = generateToken(userData._id);
    return res.json({ success: true, userData, token, message: "Login successful" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const checkAuth = (req, res) => {
  try {
    return res.json({ success: true, user: req.user });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;

    let updatedUser;
    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true }).select("-password");
    } else {
      const uploaded = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploaded.secure_url, bio, fullName },
        { new: true }
      ).select("-password");
    }

    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
