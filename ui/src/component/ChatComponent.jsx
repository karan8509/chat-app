import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

function ChatComponent() {
  const [input, setInput] = useState(" ");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = io("http://192.168.1.42:8000", {
      withCredentials: true,
    });

    socket.on("message-user", (message) => {
      setChat((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    const messageObj = { text: input, from: "You" };
    socket.emit("message-user", messageObj);
    setChat((prev) => [...prev, messageObj]);
    setInput("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 border-gray-300 text-center">
        💬 Live Chat
      </h2>

      <div className="h-64 overflow-y-auto border border-gray-200 rounded-md p-2 bg-gray-50 mb-4 space-y-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-black bg-gray-200 ${
              msg.from === "You" ? "ml-auto text-right" : "text-left"
            }`}
          >
            <span className="block text-sm font-semibold text-black">
              {msg.from}
            </span>
            <span className="block text-base text-black">{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
        />
        <button
          onClick={handleClick}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
