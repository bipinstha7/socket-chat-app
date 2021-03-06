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
const {Users} = require('./utils/users');
// make instance of a User class
let users = new Users();


// io.on lets us register event listener
// we listen for specific event and do something when that event happens
// 'connection' lets us to listen for a new connection meaning client connected to the server
io.on('connection', (socket) => {
  console.log('new user connected');

  // join
  socket.on('join', (name, room, callback) => {
    if(!isRealString(name) || !isRealString(room)) {
      return callback('name and room name are required');
    }

    socket.join(room);
    users.addUser(socket.id, name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));

    // socket.emit from Admin to the new user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // socket.broadcast.to(room).emit() - emits the message to all other users who are connected/inside the room
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined`));

    callback();
  });


  // get message from the client
  socket.on('createMessage', (message, callback) => {
    // socket.emit - emits an event a single user but io.emit emits an event to all connected users
    // send message to each and every connected users
    let user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      // send message to respective room only
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback(); 
  });

  // get user's position
  socket.on('createLocationMessage', coords => {
    let user = users.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  // client disconnect
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    }
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