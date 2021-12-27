const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

let users = [];

io.on("connection", (socket) => {
    socket.on('login', (nome, password) => {
        const user = {
            nome,
            id: socket.id,
            password
        }
        users.push(user);
        io.emit('new login', users);
    })

    socket.on('message', (data) => {
        socket.broadcast.emit("sendMessage", data)
    })

    socket.on("disconnect", () => {
        console.log(`User disconnect ${socket.id}`);
    })
});


server.listen(3000, () => {
    console.log("boa noite");
})