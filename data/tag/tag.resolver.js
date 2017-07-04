import steem from "../connectors/steemjs.connector.js";
import _ from "lodash";

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
      return tags;
    },

    /**
     *
     * @param root
     * @param args.jjj
     * @returns {Promise.<*>}
     */
    async getDiscussionsByCreated(root, args) {
      const query = _.merge({ limit: 25 }, { ...args });

      console.log(query);
      const posts = await steem.api.getDiscussionsByCreated(query);
      console.log(posts);
      return posts;
    }
  }
};

export default TagResolvers;
