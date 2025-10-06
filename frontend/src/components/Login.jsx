import React, { useState } from "react";


export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

const handleLogin = (e) => {
  e.preventDefault();
  if (!username.trim()) return alert("Enter username!");

  // Tạo JWT giả — backend verify sẽ fail nếu dùng jwt.verify, 
  // nên nhớ ở backend tạm thời bỏ xác thực JWT (như tớ hướng dẫn Cách 1)
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ id: username, name: username }));
  const fakeToken = `${header}.${payload}.signature`;

  localStorage.setItem("access_token", fakeToken);
  onLogin(fakeToken);
};


  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Join Chat</button>
      </form>
    </div>
  );
}
