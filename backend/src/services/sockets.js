import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../models/Message.js";
import { sendToQueue } from "./sqs.js";  

export function createSocketServer(httpServer, corsOrigin) {
  // chấp nhận CSV từ env -> mảng
  const origins = corsOrigin === "*" ? "*" : corsOrigin.split(",").map(s => s.trim());

  const io = new Server(httpServer, {
    cors: {
      origin: origins,            // <- cho phép 127.0.0.1:5500
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));
    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("join", (room) => room && socket.join(room));

    socket.on("message:send", async (payload, cb) => {
      try {
        const { text, to, room } = payload || {};
        if (!text?.trim()) return cb?.({ ok:false, error:"Text required" });

        const msg = await Message.create({ text, to, room, from: socket.user.id });

        if (room) io.to(room).emit("message:new", msg);
        else io.emit("message:new", msg);

        await sendToQueue({ type:"NEW_MESSAGE", data:{ id: msg._id } }); // nếu dùng SQS
        cb?.({ ok:true, data: msg });
      } catch (e) {
        cb?.({ ok:false, error:"Server error" });
      }
    });
  });

  return io;
}
