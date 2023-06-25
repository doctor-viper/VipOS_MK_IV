// Express App + Socket.IO inits
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Chat Client Info
const client = require('./config/client-info');

// Twurple Init
const { RefreshingAuthProvider } = require('@twurple/auth');
const { ChatClient } = require('@twurple/chat');

// FileSystem
const { promises: fs } = require('fs');

// Raffle functions
const { RaffleStart, RaffleEnd } = require('./raffles')

/**
 *  Connect to Chat
 * 
 */
const chatInit = async function() {

  // Auth Provider init
  const clientId = client.id;
  const clientSecret = client.secret;
  const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8'));
  const authProvider = new RefreshingAuthProvider(
    {
      clientId,
      clientSecret,
      onRefresh: async newTokenData => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
    },
    tokenData
  );
  

  // const apiClient = new ApiClient({ authProvider });
  // const listener = new EventSubWsListener({ apiClient });
  // await listener.start();
  

  // Chat Client init
  const chatClient = new ChatClient({ authProvider, channels: ['dr_viper'] });
  await chatClient.connect();
    

  // Indicate when bot is connected to chat
  chatClient.onRegister(() => {
      console.log("chat is connected")
  })


  // Listen to chat messages
  chatClient.onMessage((channel, user, text, msg) => {        

 
    if(msg.isHighlight && (msg.userInfo.isBroadcaster || msg.userInfo.isMod || msg.userInfo.isVip)) {
      // Do Highlight stuff
      io.emit('text-alert', { message: text });
    }

    console.log(msg);
    console.log(text);

    if(text === '!startraffles') { if(msg.userInfo.isMod || msg.userInfo.isBroadcaster) { RaffleStart(); } }
    if(text === '!endraffles')   { if(msg.userInfo.isMod || msg.userInfo.isBroadcaster) { RaffleEnd();   } }

    if(text === "!textalert") { chatClient.say(channel, "command is working"); io.emit('text-alert', { message: "req.body.msg" }); }


    
  });


}


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

app.get('/overlay/tv-guide', (req, res) => {
  res.render('tv_guide.ejs')
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


/**
 * API Endpoints
 * 
 */

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


/**
 * Initialize the chat bot
 * 
 */
chatInit()