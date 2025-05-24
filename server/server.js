const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://chat-app:1gOj4GgosMvduDxV@cluster1.hfwjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Message Schema
const Message = mongoose.model('Message', new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
}));

// Routes
app.get('/', (req, res) => res.send('Chat API Running'));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', async (data) => {
    const { sender, receiver, message } = data;
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();

    io.emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => console.log('Server started on http://localhost:5000'));
