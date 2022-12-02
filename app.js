const express = require('express');
// const path = require('path');

const app = express();

// const http = require('http').Server(app);
// const io = require('socket.io')(http);


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
app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})