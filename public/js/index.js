// io requests from client to the server to open up web socket and keep that connection open
const socket = io();

socket.on('connect', () => {
  console.log("Connected to server");
});

// get email from the server
socket.on('newEmail', (email) => {
  console.log(email);
});

// send email to the server
socket.emit('createEmail',{
  to: 'john@example.com',
  text: "Hey this is form client"
});

socket.on('disconnect', () => {
  console.log("Connection terminated from the server");
});
