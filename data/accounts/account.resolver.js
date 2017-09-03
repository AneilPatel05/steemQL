import dsteem from "../connectors/dsteem.connector";
import steem from "steem";
import { head } from "lodash/fp";
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
    async accounts(root, args) {
      const { usernames } = args;
      return await dsteem.database.getAccounts(usernames);
    },

    /**
     * Get single account.
     * @param root
     * @param args
     * @returns {Promise.<*>}
     */
    async account(root, args) {
      const { username } = args;
      const res = await dsteem.database.getAccounts([username]);
      return head(res);
    },

    /**
     * Get number of steem accounts.
     * @returns {Promise.<*>}
     */
    async accountCount() {
      const count = await steem.api.getAccountCount();
      return count;
    },
    /**
     * Get accounts history from steem.
     * @param root
     * @param args
     * @return {Promise.<*>}
     */
    async accountHistory(root, args) {
      const { username, from = 50, limit = 25 } = args;
      const history = await steem.api.getAccountHistory(username, from, limit);
      console.log(JSON.stringify(history));
      // Have to flatten
      return JSON.stringify(history);
    }
  }
};

export default AccountResolvers;
