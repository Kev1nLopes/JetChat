const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        credentials: true,
    }
})

let users = [];

io.on("connection", (socket) => {
    socket.on("newUser", (user) => {

    })
    socket.on("disconnect", () => {

    })
})



server.listen(3000, () => {
    console.log("Server listening on port 3000");
});