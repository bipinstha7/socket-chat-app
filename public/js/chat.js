// const bodyParser = require('body-parser');

// // body-parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// io requests from client to the server to open up web socket and keep that connection open
const socket = io();

// message scroller to newest
function scrollToBottom() {
  // selectors
  let messages = document.getElementById('messages');
  let newMessage = messages.lastChild;
  let newMessageHeight = newMessage.clientHeight;

  // let lastMessageHeight2 = newMessage.previousElementSibling
  // console.log(lastMessageHeight2);

  // let lastMessageHeight = newMessage.previousElementSibling.clientHeight;
  // console.log(lastMessageHeight);

  // heights
  let clientHeight = messages.clientHeight;
  let scrollTop = messages.scrollTop;
  let scrollHeight = messages.scrollHeight;

  if(clientHeight + scrollTop + newMessageHeight + 61 >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
}


socket.on('connect', () => {
  console.log("Connected to server");

  let params = (new URL(document.location)).searchParams;;
  let name = params.get('name');
  let room = params.get('room')

  socket.emit('join', name, room, err => {
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No err');
    }
  });
});


socket.on('disconnect', () => {
  console.log("Connection terminated from the server");
});

// send message to the server
// socket.emit('createMessage',{
//   from: 'john@example.com',
//   text: "Hey this is form client side"
// });

// update joined user's name
socket.on('updateUserList', (users) => {
  // console.log('Users list', users);
  let ol = document.createElement('ol');

  users.forEach(user => {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(user));
    ol.appendChild(li);
    console.log(ol);
  });
  let showUsers = document.getElementById('users');
  showUsers.innerHTML = ol.innerHTML;
});


// get message from the server
socket.on('newMessage', (message) => {
  // console.log('newMessage', message);
  // format time using moment
  const formattedTime = moment(message.createdAt).format('LT');

  let template = document.getElementById('message-template').innerHTML;
  let html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime, 
    text: message.text
  });

  let ol = document.getElementById('messages');
  let li = document.createElement('li');
  li.innerHTML = html;
  ol.appendChild(li);

  scrollToBottom(); 

  // let li = document.createElement('li');
  // let strong = document.createElement('strong');
  // let nodeFrom = document.createTextNode(`${message.from}`);
  // strong.appendChild(nodeFrom);
  // let nodeText = document.createTextNode(` ${formattedTime}: ${message.text}`);
  // li.appendChild(strong);
  // li.appendChild(nodeText);
  // let ol = document.getElementById('messages');
  // ol.appendChild(li);
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

// receive location 
socket.on('newLocationMessage', (message) => {
  // format time using moment
  const formattedTime = moment(message.createdAt).format('LT');
   let template = document.getElementById('location-message-template').innerHTML;
   let html = Mustache.render(template, {
     from: message.from,
     createdAt: formattedTime, 
     url: message.url
   });
 
   let ol = document.getElementById('messages');
   let li = document.createElement('li');
   li.innerHTML = html;
   ol.appendChild(li);

   scrollToBottom();

  // let li = document.createElement('li');
  // let a = document.createElement('a');
  // let node = document.createTextNode('My current location');
  // a.setAttribute('target', '_blank');
  // a.appendChild(node);

  // let liTextNode = document.createTextNode(`${message.from} ${formattedTime}: `); 
  // a.setAttribute('href', message.url);
  // li.appendChild(liTextNode);
  // li.appendChild(a);

  // let ol = document.getElementById('messages');
  // ol.appendChild(li);
});

// Send Location
let locationButton = document.getElementById('send-location');

locationButton.addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.setAttribute('disabled', 'true');

  navigator.geolocation.getCurrentPosition((position) => {
    locationButton.setAttribute('disabled', 'false');
    // console.log("position");
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.setAttribute('disabled', 'false');
    alert('unable to fetch location');
  });
});