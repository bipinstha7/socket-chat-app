// io requests from client to the server to open up web socket and keep that connection open
const socket = io();

socket.on('connect', () => {
  console.log("Connected to server");
});

// send message to the server
// socket.emit('createMessage',{
//   from: 'john@example.com',
//   text: "Hey this is form client side"
// });

// get message from the server
socket.on('newMessage', (message) => {
  console.log('newMessage', message);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'hi'
}, (data) => {
  console.log('got it', data);
});

socket.on('disconnect', () => {
  console.log("Connection terminated from the server");
});
