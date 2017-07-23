import dsteem from "../connectors/dsteem.connector";
import steem from "steem";
import _ from "lodash";
import moment from "moment";

const BlockResolvers = {
  Query: {
    async getBlockHeader(root, args) {
      const { blockNumber } = args;
      return await dsteem.database.getBlockHeader(blockNumber);
    }
  }
};

export default BlockResolvers;
