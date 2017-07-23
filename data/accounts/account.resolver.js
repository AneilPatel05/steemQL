import dsteem from "../connectors/dsteem.connector";
import steem from "steem";
import _ from "lodash";
import moment from "moment";

const AccountResolvers = {
  Query: {
    /**
     * Get a list of accounts.
     * @param root
     * @param args.users - Array of usernames.
     * @returns {Promise.<*>}
     */
    async getAccounts(root, args) {
      const { usernames } = args;
      return await dsteem.database.getAccounts(usernames);
    },

    async lookupAccountNames(root, args) {
      const { usernames } = args;
      return await steem.api.lookupAccountNames(usernames);
    },

    async lookupAccounts(root, args) {
      const { lowerBoundName, limit = 25 } = args;
      return await steem.api.lookupAccounts(lowerBoundName, limit);
    },

    /**
     * Get number of steem accounts.
     * @returns {Promise.<*>}
     */
    async getAccountCount() {
      const count = await steem.api.getAccountCount();
      return count;
    },
    /**
     * Get accounts history from steem.
     * @param root
     * @param args
     * @return {Promise.<*>}
     */
    async getAccountHistory(root, args) {
      const { username, from = 50, limit = 25 } = args;
      const history = await steem.api.getAccountHistory(username, from, limit);
      console.log(JSON.stringify(history));
      // Have to flatten
      return JSON.stringify(history);
    }
  }
};

export default AccountResolvers;
