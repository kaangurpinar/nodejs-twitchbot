import * as dotenv from 'dotenv';

dotenv.config();

const channels = ((process.env.TWITCH_CHANNELS).split(',')).map(c => c.trim());
console.log(channels[0]);
