// Express App + Socket.IO inits
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Get CLient ID + Secret
const client = require('./client-info');

// Twurple Init
const { RefreshingAuthProvider } = require('@twurple/auth');
const { ChatClient } = require('@twurple/chat');

// FileSystem
const { promises: fs } = require('fs');


/**
 *  Connect to Chat
 * 
 */
async function main() {
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

	const chatClient = new ChatClient({ authProvider, channels: ['dr_viper'] });
	await chatClient.connect();

	chatClient.onMessage((channel, user, text) => {
    
    const regex = /vipos|vip os|viper os|viperos/ig; 
    if( text.match(regex) != null && user != 'vipos_mk3' ) {
      // Detect for VipOS references
    }

		if (text === '!ping') {
			chatClient.say(channel, 'Pong!');
		} else if (text === '!dice') {
			const diceRoll = Math.floor(Math.random() * 6) + 1;
			chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
		}

	});

	chatClient.onSub((channel, user) => {
		chatClient.say(channel, `Thanks to @${user} for subscribing to the channel!`);
	});
	chatClient.onResub((channel, user, subInfo) => {
		chatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
	});
	chatClient.onSubGift((channel, user, subInfo) => {
		chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
	});
}

main();

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

app.get('/overlay/info-bar-side', (req, res) => {
  res.render('info_bar_side.ejs')
})

app.get('/overlay/text-alert', (req, res) => {
  res.render('text_alert.ejs')
})

app.get('/overlay/knight-rider', (req, res) => {
  res.render('knight_rider.ejs')
})


app.get('/api/v1/text', (req,res) => {
  io.emit('text-alert', { message: 'super cool new test' }); // This will emit the event to all connected sockets
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
server.listen(5000, () => {
  console.log('server is listening on port 5000....')
})
