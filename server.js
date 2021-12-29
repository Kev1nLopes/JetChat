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



io.on('connection', (socket)=>{
    console.log('Conectado');
    socket.on('userLogin', user=>{
        socket.user = user;
        console.log('new login');
    })
    socket.on('newMessage', msg =>{
        socket.broadcast.emit('alertMessage', msg);
        socket.emit('showMessage', msg);
    })
});

server.listen(3000, ()=>{
    console.log('server listening on port 3000');
})