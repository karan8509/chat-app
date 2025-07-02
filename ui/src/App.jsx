// import { useEffect, useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import HomePages from "./pages/HomePages";
// import Singup from "./pages/Singup-user";
// import Login from "./pages/Login-user";
// import { ToggleLeft, User } from "lucide-react";
// import { Toaster } from "react-hot-toast";
// import ChatComponent from "./component/ChatComponent";

// const App = () => {
//   const [user, setUser] = useState();
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log(token);
//     if (token) {
//       setUser(true); // Ya decoded ID set karo if needed
//     }
//   }, []);

//   return (
//     <div className="bg-gray-900 h-screen text-white flex justify-center items-center relative">
//       <div className="absolute top-5  right-10  text-2xl">
//         <ToggleLeft
//           onClick={() => {
//             console.log("hello");
//           }}
//         />
//       </div>
//       <Routes>
//         <Route path="/" element={<HomePages />} />
//         <Route index element={<Singup />} />
//         <Route
//           path="/login"
//           element={user ? <ChatComponent /> : <Login setUser={setUser} />}
//         />
//       </Routes>
//       <Toaster />
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const joinChat = () => {
    if (username.trim()) {
      socket.emit("join", username);
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send_message", { username, message });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  if (!isJoined) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Enter Username to Join</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
        />
        <button onClick={joinChat}>Join</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {/* Online Users List */}
      <div style={{ width: "30%", marginRight: "20px" }}>
        <h3>🟢 Online Users</h3>
        <ul>
          {onlineUsers.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div style={{ flex: 1 }}>
        <h2>💬 Chat as {username}</h2>
        <div
          style={{
            border: "1px solid #ccc",
            height: "300px",
            overflowY: "auto",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          {chat.map((msg, i) => (
            <p key={i}>
              <strong>{msg.username}:</strong> {msg.message}
            </p>
          ))}
        </div>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          style={{ width: "70%", padding: "5px" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
