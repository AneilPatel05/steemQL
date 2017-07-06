import steem from "../connectors/steemjs.connector.js";

const PostResolvers = {
  Query: {
    /**
     * Get posts.
     * args
     * @returns {Promise.<*>}
     */
    async posts(root, args) {
      const { afterTag, limit = 25 } = args;
      const tags = await steem.api.getTrendingTags(afterTag, limit);
      return tags;
    }
  }
};

export default PostResolvers;
