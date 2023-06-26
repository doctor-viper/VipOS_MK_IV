// Chat Client Info
const client = require('./config/client-info');

// Twurple Init
const { RefreshingAuthProvider } = require('@twurple/auth');
const { ChatClient } = require('@twurple/chat');

// FileSystem
const { promises: fs } = require('fs');

// Raffle functions
const { RaffleStart, RaffleEnd } = require('./raffles');

// Get socket IO
var io;
module.exports = function(importIO) {
    io = importIO;
}


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
  
      // console.log(msg);
      // console.log(text);
  
      if(text === '!startraffles') { if(msg.userInfo.isMod || msg.userInfo.isBroadcaster) { RaffleStart(); } }
      if(text === '!endraffles')   { if(msg.userInfo.isMod || msg.userInfo.isBroadcaster) { RaffleEnd();   } }
  
      if(text === "!textalert") { 
        chatClient.say(channel, "command is working"); 
        io.emit('text-alert', { message: 'test 1 2 3' });
      }  
      
    });
    
  }

  
/**
 * Initialize the chat bot
 * 
 */
chatInit();