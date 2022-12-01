
// import { RefreshingAuthProvider } from '@twurple/auth';
// import { ChatClient } from '@twurple/chat';
// import { promises as fs } from 'fs';

// import ejs from 'ejs';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

// setup static and middleware
app.use(express.static('./public'))
app.set("view enginge","ejs")

app.get('/', (req, res) => {
  res.send('VipOS MARK IV')
  //res.sendFile(path.resolve(__dirname, './templates/header.html'))
})

app.get('/animated-bg', (req, res) => {
    res.render('animated_bg.ejs')
  })

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})

/**
 * 
 *  V I P E R
 * 
 *  Read this article for listening to Twitch Events - MK 4 MUTHAFUCKA
 * 
 */
// https://d-fischer.github.io/twitch-eventsub/docs/basic-usage/listening-to-events.html

// async function main() {
// 	const clientId = '';
// 	const clientSecret = '';
// 	const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8'));
// 	const authProvider = new RefreshingAuthProvider(
// 		{
// 			clientId,
// 			clientSecret,
// 			onRefresh: async newTokenData => await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
// 		},
// 		tokenData
// 	);

// 	const chatClient = new ChatClient({ authProvider, channels: ['dr_viper'] });
// 	await chatClient.connect();

// 	chatClient.onMessage((channel, user, text) => {
// 		if (text === '!ping') {
// 			chatClient.say(channel, 'Pong!');
// 		} else if (text === '!dice') {
// 			const diceRoll = Math.floor(Math.random() * 6) + 1;
// 			chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
// 		}
// 	});

// 	chatClient.onSub((channel, user) => {
// 		chatClient.say(channel, `Thanks to @${user} for subscribing to the channel!`);
// 	});
	
//     chatClient.onResub((channel, user, subInfo) => {
// 		chatClient.say(channel, `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`);
// 	});

// 	chatClient.onSubGift((channel, user, subInfo) => {
// 		chatClient.say(channel, `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`);
// 	});
// }

// main();