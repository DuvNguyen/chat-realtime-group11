import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Message from "../models/Message.js";

const router = Router();

// Lấy lịch sử tin nhắn (ví dụ theo room)
router.get("/", auth, async (req, res) => {
  const { room } = req.query;
  const q = room ? { room } : { $or: [{ from: req.user.id }, { to: req.user.id }] };
  const msgs = await Message.find(q).sort({ createdAt: -1 }).limit(100);
  res.json(msgs);
});

// Gửi tin nhắn qua REST (song song với socket)
router.post("/", auth, async (req, res) => {
  const { text, to, room } = req.body;
  if (!text?.trim()) return res.status(400).json({ message: "Text required" });
  const doc = await Message.create({ text, to, room, from: req.user.id });
  res.json(doc);
});

export default router;
