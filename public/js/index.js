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
  let li = document.createElement('li');
  let strong = document.createElement('strong');
  let nodeFrom = document.createTextNode(`${message.from}`);
  strong.appendChild(nodeFrom);
  let nodeText = document.createTextNode(`: ${message.text}`);
  li.appendChild(strong);
  li.appendChild(nodeText);
  let ol = document.getElementById('messages');
  ol.appendChild(li);
});

socket.on('disconnect', () => {
  console.log("Connection terminated from the server");
});


// dom process

let messageForm = document.getElementById('message-form');
let input = document.getElementById('input');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // if input field is not empty: send the message
  if (input.value) {
    // send input data
    socket.emit('createMessage', {
      from: 'User',
      text: input.value
    }, () => {

    });
    // empty input field after sent
    input.value = '';
  }
});

// Send Location
let locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    // console.log("position");
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('unable to fetch location');
  });
});
