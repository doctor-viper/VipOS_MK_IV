// Chat Client Info ( ID + Secret )
const client = require('../config/client-info');
// Get the Refreshing Auth provider ( will refresh tokens as needed )
const { RefreshingAuthProvider } = require('@twurple/auth');
// FileSystem
const { promises: fs } = require('fs');

let authProvider;

const authInit = async function() {
    // Auth Provider init
    const clientId = client.id;
    const clientSecret = client.secret;
    const tokenData = JSON.parse(await fs.readFile('./config/tokens.json', 'UTF-8'));
    authProvider = new RefreshingAuthProvider(
    {
        clientId,
        clientSecret,
        onRefresh: async newTokenData => await fs.writeFile('./config/tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
    },
    tokenData
    );

}

authInit();

module.exports = {
    authProvider: authProvider
}
