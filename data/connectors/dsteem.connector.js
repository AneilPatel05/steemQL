import { Client } from "dsteem";
import { config } from "dotenv";

// Execute .env config.
config();

// const client = new Client("wss://steemd.steemit.com");
const client = new Client(process.env.STEEM_WEBSOCKET_URL, {
  chainId: "79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673",
  addressPrefix: "STX"
});

export default client;
