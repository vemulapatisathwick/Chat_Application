const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const db = require('./db');

app.use(express.static('public'));
app.use(express.json());

// Handle login
app.post('/login', async (req, res) => {
const { username, password } = req.body;
  console.log('Login attempt:', username, password); // 🟢 Log login attempt for debugging

let isValid;
try {
    // For testing: allow any non-empty username/password
    isValid = username && password ? true : false;
    // When you want real validation, uncomment:
    // isValid = await db.validateUser(username, password);
} catch (err) {
    console.error('Login error:', err);
    isValid = false;
}

res.json({ success: isValid });
});

// WebSocket events
io.on('connection', (socket) => {
console.log('User connected');

socket.on('join', ({ username, room }) => {
    console.log(`${username} joined room: ${room}`);
    socket.join(room);
    socket.username = username;
    socket.room = room;

    io.to(room).emit('userList', getUsersInRoom(room));
});

socket.on('message', (msg) => {
    console.log(`Message in room ${msg.room}: ${msg.text}`);
    io.to(msg.room).emit('message', msg);
    if (db.saveMessage) {
    db.saveMessage(msg);
    }
});

socket.on('disconnect', () => {
    console.log(`${socket.username || 'User'} disconnected`);
    if (socket.room) {
    io.to(socket.room).emit('userList', getUsersInRoom(socket.room));
    }
});
});

// Helper to get users in room
function getUsersInRoom(room) {
const clients = Array.from(io.sockets.adapter.rooms.get(room) || []);
return clients.map(id => io.sockets.sockets.get(id).username).filter(Boolean);
}

http.listen(3000, () => {
console.log('Server running on http://localhost:3000');
});


