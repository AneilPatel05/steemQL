import dsteem from "../connectors/dsteem.connector";
import steem from "steem";
import _ from "lodash";
import moment from "moment";

const BlockResolvers = {
  Query: {
    async getBlockHeader(root, args) {
      const { blockNumber } = args;
      return await dsteem.database.getBlockHeader(blockNumber);
    },
    async getBlock(root, args) {
      const { blockNumber } = args;
      await dsteem.database.getBlock(blockNumber);
    }
  }
};

export default BlockResolvers;
