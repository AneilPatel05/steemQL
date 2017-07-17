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
      const { searchString } = args;

      const result = await Posts.find(
        { $text: { $search: searchString } },
        { score: { $meta: "textScore" } }
      )
        .sort({ created: -1 })
        .limit(25);
      return result;
    },
    async searchPostsSQL(root, args) {
      const { searchString } = args;
      const result = await sql.query`SELECT TOP 25 * FROM TxComments 
        WHERE body LIKE '%sarasate%'
        ORDER BY timestamp DESC`;
      return result.recordset;
    }
  }
};

export default PostResolvers;
