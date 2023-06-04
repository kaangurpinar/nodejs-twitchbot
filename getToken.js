import fetch from "node-fetch";
import QueryString from "qs";
import * as dotenv from 'dotenv';

dotenv.config();

const body = {
    "client_id": process.env.TWITCH_CLIENT_ID,
    "client_secret": process.env.TWITCH_CLIENT_SECRET,
    "grant_type": "client_credentials"
}

const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'post',
    body: QueryString.stringify(body),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

const data = await response.json();
console.log(data);