const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (Frontend)
app.use(express.static(__dirname));

// MySQL Database Connection (Using Pool)
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'real_time_app'
});

// Handle database connection errors
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
    connection.release();
});

// Route to get chat history with sender_id and receiver_id from URL
app.get('/messages/:sender_id/:receiver_id', (req, res) => {
    const sender_id = req.params.sender_id;
    const receiver_id = req.params.receiver_id;

    db.query(
        'SELECT message, sender_id, receiver_id, timestamp FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp ASC',
        [sender_id, receiver_id, receiver_id, sender_id],
        (err, results) => {
            if (err) {
                console.error('Error fetching messages:', err);
                res.status(500).json({ error: "Database error" });
            } else {
                res.json(results);
            }
        }
    );
});

// Socket.io connection
const userSockets = {}; // Object to store connected user sockets

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Register the user based on their sender_id or receiver_id
    socket.on('register', (user_id) => {
        userSockets[user_id] = socket.id;
        console.log(`User ${user_id} connected with socket id: ${socket.id}`);
    });

    // Handle chat message event
    socket.on('chat message', (msg, sender_id, receiver_id) => {
        console.log('Message received:', msg);

        // Insert message into the database
        db.query(
            "INSERT INTO messages (message, sender_id, receiver_id) VALUES (?, ?, ?)", 
            [msg, sender_id, receiver_id], 
            (err, result) => {
                if (err) {
                    console.error("Error saving message:", err);
                    return;
                }
                console.log("Message saved successfully!");

                // Fetch updated chat history from the database after the message is inserted
                db.query(
                    'SELECT message, sender_id, receiver_id, timestamp FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp ASC',
                    [sender_id, receiver_id, receiver_id, sender_id],
                    (err, results) => {
                        if (err) {
                            console.error('Error fetching updated messages:', err);
                            return;
                        }

                        // Emit the updated chat history to both users (sender and receiver)
                        if (userSockets[sender_id]) {
                            io.to(userSockets[sender_id]).emit('updated messages', results);
                        }
                        if (userSockets[receiver_id]) {
                            io.to(userSockets[receiver_id]).emit('updated messages', results);
                        }
                    }
                );
            }
        );
    });

    // Send previous messages when a user connects
    socket.on('get previous messages', (sender_id, receiver_id) => {
        db.query(
            'SELECT message, sender_id, receiver_id, timestamp FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp ASC',
            [sender_id, receiver_id, receiver_id, sender_id],
            (err, results) => {
                if (err) {
                    console.error('Error fetching previous messages:', err);
                    return;
                }

                // Emit previous messages to the connected user
                socket.emit('updated messages', results);
            }
        );
    });

    // Disconnect user
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Remove user from the socket map on disconnect
        for (const userId in userSockets) {
            if (userSockets[userId] === socket.id) {
                delete userSockets[userId];
                break;
            }
        }
    });
});

   

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
