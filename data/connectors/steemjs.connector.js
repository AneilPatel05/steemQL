import steem from "steem";
import { config } from "dotenv";

// Execute .env config.
config();

// steem.config.set("websocket", process.env.STEEM_WEBSOCKET_URL);
// steem.config.set("address_prefix", process.env.STEEM_ADDRESS_PREFIX);
// steem.config.set("chain_id", process.env.STEEM_CHAIN_ID);

export default steem;
