const socketIO = require('socket.io');
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketIO(server);

// io.on lets us register event listener
// we listen for specific event and do something when that event happens
// 'connection' lets us to listen for a new connection meaning client connected the server
io.on('connection', (socket) => {
  console.log('new user connected');

  // client disconnect
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});


const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});