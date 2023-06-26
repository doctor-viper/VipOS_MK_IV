# Config Directory

There should be three files in this directory, as follows:

**client-info.js**
```
// Client ID and Secret for Bot
const id = 'your-id-here';
const secret = 'your-secret-here';

module.exports = { id, secret };
```

**raffle-info.js**
```
// Define configuration options
const opts = {
  identity: {
    username: 'your-username',
    password: 'super-secret-password'
  },
  channels: [
    'your-username'
  ]
}

module.exports = { opts };
```

**tokens.json**
```
{
    "accessToken": "secret-access-token",
    "refreshToken": "secret-refresh-token",
    "scope": [
        "bits:read",
        "channel:manage:broadcast",
        "channel:manage:moderators",
        "channel:manage:polls",
        "channel:manage:raids",
        "channel:manage:redemptions",
        "channel:manage:vips",
        "channel:moderate",
        "channel:read:hype_train",
        "channel:read:polls",
        "channel:read:redemptions",
        "channel:read:subscriptions",
        "channel:read:vips",
        "chat:edit",
        "chat:read",
        "moderation:read",
        "moderator:manage:announcements",
        "moderator:read:chatters",
        "user:read:broadcast"
    ],
    "expiresIn": 12345,
    "obtainmentTimestamp": 1234567890
}
```