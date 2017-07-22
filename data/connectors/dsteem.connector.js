import { Client } from "dsteem";
import { config } from "dotenv";

// Execute .env config.
config();

// const client = new Client("wss://steemd.steemit.com");
const client = new Client(process.env.STEEM_WEBSOCKET_URL);

export default client;
