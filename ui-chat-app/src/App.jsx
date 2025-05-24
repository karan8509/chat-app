import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    const data = {
      sender: "User1",
      receiver: "User2",
      message,
    };
    socket.emit('sendMessage', data);
    setMessage('');
  };

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat App</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 200, overflowY: 'scroll' }}>
        {chat.map((msg, i) => (
          <p key={i}><strong>{msg.sender}:</strong> {msg.message}</p>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
