const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('chat.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fromUser TEXT,
        toUser TEXT,
        room TEXT,
        text TEXT,
        timestamp TEXT
    )`);
    db.run(`INSERT OR IGNORE INTO users(username, password) VALUES('admin', 'admin123')`);
});

exports.validateUser = (username, password) => {
    return new Promise((resolve) => {
        db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, row) => {
            resolve(!!row);
        });
    });
};

exports.saveMessage = (msg) => {
    return new Promise((resolve) => {
        db.run(`INSERT INTO messages (fromUser, toUser, room, text, timestamp) VALUES (?, ?, ?, ?, ?)`,
            [msg.from, msg.to, msg.room, msg.text, msg.timestamp], resolve);
    });
};

exports.getMessages = (room) => {
    return new Promise((resolve) => {
        db.all(`SELECT * FROM messages WHERE room = ? ORDER BY id ASC LIMIT 50`, [room], (err, rows) => {
            resolve(rows);
        });
    });
};
