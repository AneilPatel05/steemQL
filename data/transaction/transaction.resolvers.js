import dsteem from "../connectors/dsteem.connector";
import steem from "steem";

const TransactionResolvers = {
  Query: {
    async getTransaction(root, args) {
      const { transactionId } = args;
      const res = steem.api.getTransaction(transactionId);
      console.log(res);
      return res;
    }
  }
};

export default TransactionResolvers;
