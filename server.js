const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

//Inicializamos socketio
const socketIO = require('socket.io');
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});;

//Funcionalidad de socket.io en el servidor
io.on('connection', (socket) => {
  socket.on('connected', (name) => {
    let _name = name;
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit('messages', { name: _name, message: `${_name} se ha conectado` });
    console.log(`${name} connected`);
  });

  socket.on('message', (name, message) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit('message', { name, message });
    console.log(`message from ${name}: ${message}`);
  });

  socket.on('disconnect', () => {
    io.emit('messages', { server: 'Server', message: 'User disconnected' });
    console.log('user disconnected');
  });
  console.log('New user connected');
});


server.listen(3001, () => {
  console.log('listening on localhost:3001');
});