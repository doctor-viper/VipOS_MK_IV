// Get CLient ID + Secret
const client = require('./config/client-info');

// Twurple Init
const { RefreshingAuthProvider } = require('@twurple/auth');
const { ChatClient } = require('@twurple/chat');
// const { ApiClient } = require('@twurple/api');
// const { EventSubWsListener } = require('@twurple/eventsub-ws');

// FileSystem
const { promises: fs } = require('fs');

// Raffle functions
const { RaffleStart, RaffleEnd } = require('./raffles')


/**
 *  Connect to Chat
 * 
 */
const init = async function() {

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

    // Chat Client init
	const chatClient = new ChatClient({ authProvider, channels: ['dr_viper'] });
	await chatClient.connect();
    

    // Indicate when bot is connected to chat
    chatClient.onRegister(() => {
        console.log("chat is connected")
    })


    // Listen to chat messages
	chatClient.onMessage((channel, user, text, msg) => {        
        if(text === '!startraffles') { if(msg.userInfo.isMod || msg.userInfo.isBroadcaster) { RaffleStart(); } }
        if(text === '!endraffles')   { if(msg.userInfo.isMod || msg.userInfo.isBroadcaster) { RaffleEnd();   } }
	});

}


/**
 * Exports
 * 
 */
module.exports = { init }