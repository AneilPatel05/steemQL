import steem from "../connectors/steemjs.connector.js";
import _ from "lodash";

const UserResolvers = {
  Query: {
    // Get user via steem.
    async user(root, args, context) {
      const users = await steem.api.getAccounts([args.username]);
      console.log(users);
      return _.head(users);
    },

    /**
     * Get a list of users.
     * @param root
     * @param args.users - Array of usernames.
     * @returns {Promise.<*>}
     */
    async users(root, args) {
      const users = await steem.api.getAccounts(args.users);
      return users;
    },

    /**
     * Get accounts history from steem.
     * @param root
     * @param args
     * @return {Promise.<*>}
     */
    async getUserHistory(root, args) {
      const { username, from = 50, limit = 25 } = args;
      const history = await steem.api.getAccountHistory(username, from, limit);
      console.log(JSON.stringify(history));
      // Have to flatten
      return JSON.stringify(history);
    }
  }
};

export default UserResolvers;
