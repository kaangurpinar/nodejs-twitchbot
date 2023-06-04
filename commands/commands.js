import fetch from "node-fetch";

export const sayHello = async (client, channel, tags, message, self) => {
    client.say(channel, `@${tags.username}, heya!`);
}

export const rollDice = async (client, channel, tags, message, self) => {
    const num = Math.floor(Math.random() * 6) + 1;
    client.say(channel, `@${tags.username} rolled a ${num}`);
}

export const getUserInfo = async (client, channel, tags, message, self) => {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${tags.username}`, {
        method: 'get',
        headers: {
            'Authorization': process.env.TWITCH_AUTHORIZATION,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    });
    const data = await response.json();
    //console.log(data.data[0]);
    return data.data[0];
}

export const getUserId = async (username) => {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
        method: 'get',
        headers: {
            'Authorization': process.env.TWITCH_AUTHORIZATION,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    });
    const data = await response.json();
    return data.data[0].id;
}

export const setTitle = async (title, client, channel, tags, message, self) => {
    const body = {
        "title": title
    };

    await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.TWITCH_BROADCASTER_ID}`, {
        method: 'patch',
        headers: {
            'Authorization': process.env.TWITCH_USER_ACCESS_TOKEN,
            'Client-Id': process.env.TWITCH_CLIENT_ID,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    client.say(channel, `@${tags.username} sets title to: ${title}`);
}

export const setGame = async (game, client, channel, tags, message, self) => {
    const gameId = getGameId(game);
    const body = {
        "game_id": gameId
    };

    await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${process.env.TWITCH_BROADCASTER_ID}`, {
        method: 'patch',
        headers: {
            'Authorization': process.env.TWITCH_USER_ACCESS_TOKEN,
            'Client-Id': process.env.TWITCH_CLIENT_ID,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    client.say(channel, `@${tags.username} sets game to: ${game}`);
}

export const getGameId = async (game) => {
    const response = await fetch(`https://api.twitch.tv/helix/games?name=${game}`, {
        method: 'get',
        headers: {
            'Authorization': process.env.TWITCH_USER_ACCESS_TOKEN,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    });
    const data = await response.json();
    return data.data[0].id;
}

export const checkMod = async (userId) => {
    const response = await fetch(`https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${process.env.TWITCH_BROADCASTER_ID}`, {
        method: 'get',
        headers: {
            'Authorization': process.env.TWITCH_USER_ACCESS_TOKEN,
            'Client-Id': process.env.TWITCH_CLIENT_ID
        }
    });
    const data = await response.json();
    //console.log(data.data);
    data.data.forEach(id => {
        if(id.user_id === userId){
            return true;
        }
        //console.log(id.user_id);
    });
    return false;
}

export const checkBroadcaster = async (username) => {
    const id = await getUserId(username);
    if(id === process.env.TWITCH_BROADCASTER_ID){
        return true;
    }
    return false;
}