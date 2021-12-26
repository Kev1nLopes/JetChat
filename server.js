const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
const SocketIo = require('socket.io');
const io = SocketIo(server);


app.get('/', (req, res) => {
    res.render(__dirname + '/src/app.vue')
})

io.on("connection", (socket) => {
    console.log("connected");
});


server.listen(8080, () => {
    console.log("boa noite");
})