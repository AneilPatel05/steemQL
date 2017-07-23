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
