import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function App() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Join private room
  useEffect(() => {
    if (sender && receiver) {
      socket.emit("joinRoom", { sender, receiver });
      axios
        .get(`http://localhost:5000/api/messages/${sender}/${receiver}`)
        .then((res) => setMessages(res.data));

      socket.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      return () => socket.off("receiveMessage");
    }
  }, [sender, receiver]);
  const sendMessage = () => {
    if (text.trim()) {
      socket.emit("sendMessage", { sender, receiver, text });
      setText("");
    }
  };


  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Private Chat</h1>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Your name"
          className="w-full p-2 border mb-2"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />

        <input
          type="text"
          placeholder="Receiver name"
          className="w-full p-2 border"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />

      </div>

      <div className="border h-96 overflow-y-auto p-2 mb-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.sender === sender ? "text-right" : "text-left"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
