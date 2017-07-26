import { Client } from "dsteem";
import { config } from "dotenv";

// Execute .env config.
config();

// const client = new Client("wss://steemd.steemit.com");
const client = new Client(process.env.STEEM_WEBSOCKET_URL, {
  chainId: process.env.STEEM_CHAIN_ID,
  addressPrefix: process.env.STEEM_ADDRESS_PREFIX
});

export default client;
