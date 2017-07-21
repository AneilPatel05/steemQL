import steem from "../connectors/steemjs.connector.js";
import dsteem from "../connectors/dsteem.connector";
import _ from "lodash";

const TagResolvers = {
  Query: {
    /**
     * Get trending tags.
     * args.afterTag - Start tag, can be "".
     * args.limit - Number of items to fetch.
     * @returns {Promise.<*>}
     */
    async trendingTags(root, args) {
      const { afterTag, limit = 25 } = args;
      const tags = await steem.api.getTrendingTags(afterTag, limit);
      return tags;
    },

    /**
     *
     * @param root
     * @param args
     * @returns {Promise.<*>}
     */
    async discussionsByCreated(root, args) {
      const query = _.merge({ limit: 25 }, { ...args });

      console.log(query);
      const posts = await steem.api.getDiscussionsByCreated(query);
      return posts;
    },


  }
};

export default TagResolvers;
