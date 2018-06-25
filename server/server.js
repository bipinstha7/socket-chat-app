const socketIO = require('socket.io');
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');

const {isRealString} = require('./utils/validation');

// io.on lets us register event listener
// we listen for specific event and do something when that event happens
// 'connection' lets us to listen for a new connection meaning client connected to the server
io.on('connection', (socket) => {
  console.log('new user connected');

  // send message to the client
  // socket.emit('newMessage', {
  //   from: 'john@doe.com',
  //   text: 'Message from the server side',
  //   createdAt: 2018
  // });


  // join
  socket.on('join', (name, room, callback) => {
    if(!isRealString(name) || !isRealString(room)) {
      callback('name and room name are required');
    }

    socket.join(room);
    // socket.leave('the office fans')

    // io.emit ==> io.to('the office fans').emit
    // socket.broadcast.emit ==> socket.broadcast.to('the office fans').emit
    // socket.emit

    // socket.emit from Admin to the new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.emit from Admin to all other users
    // socket.broadcast.to(room).emit() - emits the message to all other users who are connected/inside the room
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined`));

    callback();
  });


  // get message from the client
  socket.on('createMessage', (message, callback) => {
    // console.log('createMessage', message);
    // socket.emit - emits an event a single user but io.emit emits an event to all connected users
    // send message to each and every connected users
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });

  // get user's position
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  // client disconnect
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

// app.post('/chat', (req, res) => {
//   res.sendFile(path.join(__dirname,'../public/chat.html'));
// });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});