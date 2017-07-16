import { Posts } from "../connectors/steemdata.connector";

const PostResolvers = {
  Query: {
    /**
     * Get posts.
     * args
     * @returns {Promise.<*>}
     */
    async posts(root, args) {
      const { afterTag, limit = 25 } = args;
      const posts = await Posts.find({}).sort({ created: -1 }).limit(10).exec();
      return posts;
    },

    //  Search posts
    async searchPosts(root, args) {
      const { searchTerm } = args;

      const result = await Posts.find({ author: "sarasate" }, (err, res) => {
        console.log(err, res);
      });
      console.log(result, "result");
      return result;
    }
  }
};

export default PostResolvers;
