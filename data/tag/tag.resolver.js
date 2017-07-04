import steem from "../connectors/steemjs.connector.js";

const TagResolvers = {
  Query: {
    /**
     * Get trending tags.
     * args.afterTag - Start tag, can be "".
     * args.limit - Number of items to fetch.
     * @returns {Promise.<*>}
     */
    async getTrendingTags(root, args) {
      const { afterTag, limit = 25 } = args;
      const tags = await steem.api.getTrendingTags(afterTag, limit);
      console.log(tags);
      return tags;
    }
  }
};

export default TagResolvers;
