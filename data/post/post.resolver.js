import steem from "../connectors/steemjs.connector.js";
import db from "../connectors/steemdata.connector";

const PostResolvers = {
  Query: {
    /**
     * Get posts.
     * args
     * @returns {Promise.<*>}
     */
    // async posts(root, args) {
    //   const { afterTag, limit = 25 } = args;
    //   const tags = await steem.api.getTrendingTags(afterTag, limit);
    //   return tags;
    // },

    //  Search posts
    async searchPosts(root, args) {
      const { searchTerm } = args;

      const result = await Posts.find({ author: "sarasate" }, (err, res) => {
        console.log(err, res);
      });
      console.log(result);
      return result;
    }
  }
};

export default PostResolvers;
