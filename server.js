const express = require('express');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]

    }
})

let users = [];

io.on('connection', (socket)=>{
    console.log('Conectado');
    socket.on('userLogin', user=>{
        socket.user = user;
        users.push(user);
        socket.emit('messageLogin', user);
        socket.broadcast.emit('messageLogin', user);
        socket.emit('newUser', users);
        socket.broadcast.emit('newUser', users);
        
    })
    socket.on('newMessage', msg =>{
        socket.broadcast.emit('alertMessage', msg);
        socket.emit('showMessage', msg);
    })
    socket.on('create', (room)=>{
        console.log("room created");
        socket.join(room.roomName)
    })
    socket.on('disconnect', ()=>{
        let updateUsers = users.filter(item => item.id != socket.user.id);
        users = updateUsers;
        socket.broadcast.emit('newUser', updateUsers);
        socket.broadcast.emit('messageDisconnect', socket.user)
    })
    socket.on('privateMessage', user =>{
        socket.broadcast.to(user.id).emit('sendPrivateMsg');
    })
});

server.listen(3000, ()=>{
    console.log('server listening on port 3000');
})