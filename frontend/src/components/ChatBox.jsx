import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { initSocket } from "../services/socket";

export default function ChatBox({ token }) {
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  // const username = JSON.parse(atob(token)).id;
  const username = token;
  const chatEndRef = useRef();

  useEffect(() => {
    const s = initSocket(token);
    setSocket(s);

    s.emit("join", "room123");

    s.on("message:new", (msg) => {
      setMessages((prev) => [...prev, msg]);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => s.disconnect();
  }, [token]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("message:send", { text, room: "room123" }, (res) => {
      if (!res.ok) console.error(res.error);
      setText("");
    });
  };


  return (
    <div className="chatbox">
      <h3>Chat Room</h3>
      <div className="messages">
        {messages.map((m, i) => (
          <Message key={i} msg={m} self={username} />
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
