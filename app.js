// Express App + Socket.IO inits
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Chat Functions
const ViperChat = require('./chat');


/**
 * Initialize ViperChat function
 * 
 */
ViperChat.init()


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
  res.render('home_page.ejs')
})


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

app.get('/overlay/venom-coin',(req, res) => {
  res.render('venom_coin.ejs')
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

app.post('/api/v1/text', express.json(), (req, res) => {
  io.emit('text-alert', { message: req.body.msg });
  console.log(req.body); //TO-DO: remove this when done
  res.sendStatus(200);
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
server.listen(5000, async () => {
  console.log('server is listening on port 5000....')
})