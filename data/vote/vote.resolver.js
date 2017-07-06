import steem from "../connectors/steemjs.connector.js";

/**
 * Get active votes for user.
 * @type {{Query: {activeVotes: ((root, args)=>Promise)}}}
 */
const VoteResolvers = {
  Query: {
    async activeVotes(root, args) {
      const { username, permlink } = args;
      const votes = await steem.api.getActiveVotes(username, permlink);
      console.log(votes);
      return votes;
    }
  }
};

export default VoteResolvers;
