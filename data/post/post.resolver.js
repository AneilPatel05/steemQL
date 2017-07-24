import { Posts } from "../connectors/steemdata.connector";
import connection from "../connectors/mssql.connector";
import sql from "mssql";
import steem from "steem";

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

    /**
     * Get a single post or comment.
     * @param root
     * @param args - {author: String, permlink: String}
     * @returns {Promise.<*|Promise>}
     */
    async post(root, args) {
      const { author, permlink } = args;
      return steem.api.getContent(author, permlink);
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
