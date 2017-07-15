import steem from "../connectors/steemjs.connector.js";
import _ from "lodash";
import moment from "moment";

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
    async userHistory(root, args) {
      const { username, from = 50, limit = 25 } = args;
      const history = await steem.api.getAccountHistory(username, from, limit);
      console.log(JSON.stringify(history));
      // Have to flatten
      return JSON.stringify(history);
    }
  },
  Mutation: {
    async accountUpdate(root, args) {
      const {
        wif,
        account,
        owner = null,
        activeKey = null,
        postingKey = null,
        publicMemoKey,
        jsonMetadata = null
      } = args;
      const result = await steem.broadcast.accountUpdateAsync(
        wif,
        account,
        owner,
        activeKey,
        postingKey,
        publicMemoKey,
        JSON.parse(jsonMetadata)
      );
      return result;
    }
  },
  User: {
    // Get posts for user
    async posts(root, args) {
      const { limit = 25 } = args;

      const posts = await steem.api.getDiscussionsByAuthorBeforeDateAsync(
        root.name,
        "",
        moment().utc().format("YYYY-MM-DD[T]HHmmss"),
        limit
      );

      return posts;
    }
  }
};

export default UserResolvers;
