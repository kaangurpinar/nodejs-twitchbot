//const tmi = require('tmi.js');
//const fetch = require('node-fetch');
import tmiJs from "tmi.js";
import * as dotenv from 'dotenv';
import * as twitchBot from './commands/commands.js';

dotenv.config();

const client = new tmiJs.Client({
    options: { debug: true },
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_PASSWORD
    },
    channels: [process.env.TWITCH_CHANNELS]
});

client.connect();

client.on('message', async (channel, tags, message, self) => {
    if(self) return;

    if(!message.startsWith(process.env.PREFIX)) return;

    //const command = message.toLowerCase();

    const args = message.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === 'hello'){
        twitchBot.sayHello(client, channel, tags, message, self);
    }
    
    if(command === 'dice'){
        twitchBot.rollDice(client, channel, tags, message, self);
    }

    if(command === 'info'){
        const response = await twitchBot.getUserInfo(client, channel, tags, message, self);
        console.log(response);
    }

    if(command === 'title'){
        const id = await twitchBot.getUserId(tags.username);
        const isMod = await twitchBot.checkMod(id);
        const isBroadcaster = await twitchBot.checkBroadcaster(tags.username);
        if(isMod || isBroadcaster){
            const title = args.join(' ');
            await twitchBot.setTitle(title, client, channel, tags, message, self);
        }
    }

    if(command === 'game'){
        const id = await twitchBot.getUserId(tags.username);
        const isMod = await twitchBot.checkMod(id);
        const isBroadcaster = await twitchBot.checkBroadcaster(tags.username);
        if(isMod || isBroadcaster){
            const game = args.join(' ');
            await twitchBot.setGame(game, client, channel, tags, message, self);
        }
    }
});