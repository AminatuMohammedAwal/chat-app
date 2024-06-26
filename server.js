

const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io =socketio(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Handle WebSocket connections here
io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);

  // Listen for incoming messages from clients
  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(socket.id, " disconnected");
  });
});
app.get('/',(req,res)=>{
  res.send("Hello")
})

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});