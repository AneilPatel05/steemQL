import steem from "../connectors/steemjs.connector.js";

/**
 * Get active votes for user.
 * @type {{Query: {activeVotes: ((root, args)=>Promise)}}}
 */
const VoteResolvers = {
  Query: {
    async getActiveVotes(root, args) {
      const { username, permlink } = args;
      const votes = await steem.api.getActiveVotes(username, permlink);
      return votes;
    },

    /**
     * Get account votes.
     * @param root
     * @param args
     * @returns {Promise.<void>}
     */
    async getAccountVotes(root, args) {
      const { username } = args;
      const votes = await steem.api.getAccountVotes(username);
      return votes;
    }
  }
};

export default VoteResolvers;
