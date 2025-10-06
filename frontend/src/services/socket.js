import { io } from "socket.io-client";

export const initSocket = (token) => {
  const socket = io(import.meta.env.VITE_API_BASE_URL, {
    auth: { token },
    withCredentials: true,
  });

  socket.on("connect", () => console.log("✅ Connected:", socket.id));
  socket.on("connect_error", (err) =>
    console.error("❌ Socket connect error:", err.message)
  );

  return socket;
};
