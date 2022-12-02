const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


/**
 * Setup static directory
 *  and rendering engine
 * 
 */
app.use(express.static('./public'))
app.set("view engine","ejs")


/**
 * Home Page
 * 
 */
app.get('/', (req, res) => {
  res.send('VipOS MARK IV')
  //res.sendFile(path.resolve(__dirname, './templates/header.html'))
})


io.on('connection', function (socket) {
  socket.emit('greeting-from-server', {
      greeting: 'Hello Client'
  });
  socket.on('greeting-from-client', function (message) {
    console.log(message);
  });
});

// io.on('connection', (socket) => {
//   // socket.emit('request', /* … */); // emit an event to the socket
//   // io.emit('broadcast', /* … */); // emit an event to all connected sockets
//   // socket.on('reply', () => { /* … */ }); // listen to the event

//   // send a message to the client
//   socket.emit("hello from server", "message");

//     // console.log('a user connected');
//   // socket.on('chat message', msg => {
//   //   io.emit('chat message', msg);
//   // });
// });

/**
 * Overlays
 * 
 */
app.get('/overlay/cam-bg', (req, res) => {
  res.render('cam_bg.ejs')
})

app.get('/overlay/info-bar', (req, res) => {
  res.render('info_bar.ejs')
})

/**
 * 404 / All
 * 
 */
app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})


/**
 * Listen on port
 * 
 */
server.listen(5000, () => {
  console.log('server is listening on port 5000....')
})