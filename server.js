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
    socket.on('login', (data) => {
        const user = {
            nome: data.name,
            id: socket.id,
            password: data.password
        }
       users.push(user);
       console.log('Usuario conectado ' + user.nome);
       socket.emit('users', users);
    })

    socket.on('message', (msg) => {
        socket.emit('sendMessage', msg);

    })

    socket.on("disconnect", () => {
        // console.log(`User disconnect ${socket.id}`);
    })
});


server.listen(3000, () => {
    console.log("boa noite");
})