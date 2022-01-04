const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,

    }
})

let users = [];

io.on('connection', (socket)=>{
    console.log('Conectado');
    socket.on('userLogin', user=>{
        socket.user = user;
        users.push(user);
        socket.broadcast.emit('messageLogin', user)
    })
    socket.on('newMessage', msg =>{
        socket.broadcast.emit('alertMessage', msg);
        socket.emit('showMessage', msg);
    })
    socket.on('create', (room)=>{
        console.log("room created");
        socket.join(room.roomName)
    })
});

server.listen(3000, ()=>{
    console.log('server listening on port 3000');
})