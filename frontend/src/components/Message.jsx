import React from "react";

export default function Message({ msg, self }) {
  const isMine = msg.from === self;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        margin: "4px 0",
      }}
    >
      <div
        style={{
          background: isMine ? "#4CAF50" : "#ddd",
          color: isMine ? "white" : "black",
          padding: "6px 10px",
          borderRadius: "10px",
          maxWidth: "60%",
          wordBreak: "break-word",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}
