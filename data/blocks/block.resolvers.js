import dsteem from "../connectors/dsteem.connector";
import steem from "steem";
import _ from "lodash";
import moment from "moment";

const BlockResolvers = {
  Query: {
    async blockHeader(root, args) {
      const { blockNumber } = args;
      return await dsteem.database.getBlockHeader(blockNumber);
    },
    async block(root, args) {
      const { blockNumber } = args;
      await dsteem.database.getBlock(blockNumber);
    }
  }
};

export default BlockResolvers;
