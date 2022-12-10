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
  //res.send('VipOS MARK IV')
  res.render('home_page.ejs')
  //res.sendFile(path.resolve(__dirname, './templates/header.html'))
})


// io.on('connection', function (socket) {
//   socket.emit('greeting-from-server', {
//       greeting: 'Hello Client'
//   });
//   socket.on('greeting-from-client', function (message) {
//     console.log(message);
//   });
// });


/**
 * Overlays
 * 
 */
app.get('/overlay/cam-bg', (req, res) => {
  res.render('cam_bg.ejs')

  io.on('connection', function (socket) {
    socket.emit('greeting-from-server', {
        greeting: 'Hello Client'
    });
    socket.on('greeting-from-client', function (message) {
      console.log(message);
    });
  });


})

app.get('/overlay/info-bar', (req, res) => {
  res.render('info_bar.ejs')
})

app.get('/overlay/info-bar-side', (req, res) => {
  res.render('info_bar_side.ejs')
})

app.get('/overlay/text-alert', (req, res) => {
  res.render('text_alert.ejs')
})

app.get('/overlay/knight-rider', (req, res) => {
  res.render('knight_rider.ejs')
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