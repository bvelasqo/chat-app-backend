const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIO(server);
io.on('connection', (socket) => {
  socket.on('connected', (msg) => {
    console.log("connected");
  });
  console.log('New user connected');
});


server.listen(3000, () => {
    console.log('listening on localhost:3000');
});