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
let messages = [];

io.on("connection", (socket) => {
  socket.on('newUser', user=>{
      socket.user = user;
      if(users.indexOf(user) != -1){
          socket.emit('alreadyExist', user);
      }
      users.push(user);
      socket.emit('listUsers', users);
  })
  socket.on('newMessage', m=>{
      let msg = {
          author: socket.user.nome,
          text: m
      }
      messages.push(msg);
      socket.emit('listMessages', messages);
  })
  socket.on('disconnect', ()=>{
      users = users.filter((user)=> user.id != socket.id );
      socket.broadcast.emit('updateUsers', users);
  })
})



server.listen(3000, () => {
    console.log("Server listening on port 3000");
});