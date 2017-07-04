import steem from "../connectors/steemjs.connector.js";
import _ from "lodash";

const UserResolvers = {
  Query: {
    // Get user via steem.
    async user(root, args, context) {
      const users = await steem.api.getAccounts([args.username]);
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
     * Get number of steem accounts.
     * @returns {Promise.<*>}
     */
    async getAccountCount() {
      const count = await steem.api.getAccountCount()
      return count
    }
  }
};

export default UserResolvers;
