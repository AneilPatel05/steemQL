import { Posts } from "../connectors/steemdata.connector";
import connection from "../connectors/mssql.connector";
import sql from "mssql";

const PostResolvers = {
  Query: {
    /**
     * Get posts.
     * args
     * @returns {Promise.<*>}
     */
    async posts(root, args) {
      const { limit = 25 } = args;
      const posts = await Posts.find({}).sort({ created: -1 }).limit(25).exec();
      return posts;
    },

    //  Search posts
    async searchPosts(root, args) {
      const { searchString, limit = 25, skip = 0 } = args;

      const result = await Posts.find(
        { $text: { $search: searchString } },
        { score: { $meta: "textScore" } }
      )
        .skip(skip)
        .sort({ created: -1 })
        .limit(limit);
      return result;
    }
  }
};

export default PostResolvers;
