import fetch from "node-fetch";
import * as dotenv from 'dotenv';

dotenv.config();

const request = await fetch(`https://id.twitch.tv/oauth2/authorize
                ?client_id=${process.env.TWITCH_CLIENT_ID}
                redirect_uri=${process.env.REDIRECT_URL}
                response_type=token
                scope=channel%3Amanage%3Abroadcast+moderation%3Aread`);

/*
scopes: https://dev.twitch.tv/docs/authentication/scopes/
*/