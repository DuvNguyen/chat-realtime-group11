import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username?.trim() || !password) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: "Username taken" });
    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, username } });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, username } });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
