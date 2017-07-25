import { Posts } from "../connectors/steemdata.connector";
import fp from "lodash/fp";
import connection from "../connectors/mssql.connector";
import sql from "mssql";
import steem from "steem";
import dsteem from "../connectors/dsteem.connector";
import { PrivateKey } from "dsteem";
import { createPermLink, createJSONMetadata } from "../../helpers/helpers";

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
  },
  Mutation: {
    async createPost(root, args) {
      const { author, title, body, tags, key } = args;

      const post = {
        author: author,
        title: title,
        body: body,
        permlink: createPermLink(title),
        json_metadata: createJSONMetadata({ tags: tags }),
        parent_author: "",
        parent_permlink: tags[0]
      };

      const res = await dsteem.broadcast.comment(post, PrivateKey.from(key));

      return await steem.api.getContent(post.author, post.permlink);
    },
    async createComment(root, args) {
      const { author, body, parent_author, parent_permlink, key } = args;
      const comment = {
        author: author,
        title: "",
        body: body,
        permlink: "re-" + createPermLink(parent_permlink),
        json_metadata: "",
        parent_author: parent_author,
        parent_permlink: parent_permlink
      };
      const res = await dsteem.broadcast.comment(comment, PrivateKey.from(key));

      return await steem.api.getContent(comment.author, comment.permlink);
    }
  }
};

export default PostResolvers;
