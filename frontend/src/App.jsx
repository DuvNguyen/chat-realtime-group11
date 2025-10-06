import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import ChatBox from "./components/ChatBox";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("access_token");
    if (saved) setToken(saved);
  }, []);

  return (
    <div className="App">
      {!token ? <Login onLogin={setToken} /> : <ChatBox token={token} />}
    </div>
  );
}

export default App;
