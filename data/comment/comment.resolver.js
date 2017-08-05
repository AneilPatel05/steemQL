import dsteem from "../connectors/dsteem.connector";
import steem from "steem";
import { PrivateKey } from "dsteem";
import _ from "lodash";
import moment from "moment";

const CommentResolvers = {
  Mutation: {
    // async comment(root, args) {
    //   const { comment, key } = args;
    //   const res = await steem.broadcast.commentAsync(
    //     key,
    //     comment.parent_author,
    //     comment.parent_permlink,
    //     comment.author,
    //     comment.permlink,
    //     comment.title,
    //     comment.body,
    //     comment.json_metadata
    //   );
    //   console.log(res)
    //   return res;
    // },

    async deleteComment(root, args) {
      const { key, author, permlink } = args;
      return steem.broadcast.deleteComment(key, author, permlink);
    },

    /**
     * Broadcast new comment or post.
     * @param root
     * @param args - {comment: CommentInput, key: String}
     * @returns {Promise.<*>}
     */
    async comment(root, args) {
      const { comment, key } = args;
      const result = await dsteem.broadcast.comment(
        comment,
        PrivateKey.from(key)
      );
      console.log(result);
      return result;
    },

    /**
     * Broadcast a new post or comment with specific options.
     * @param root
     * @param args -{comment: CommentInput, options: CommentOptions, key:
      * String}
     * @returns {Promise.<*>}
     */
    async commentWithOptions(root, args) {
      const { comment, options, key } = args;
      console.log(options);
      const beneficiaries = _.concat(options.extensions, {
        account: "insteem",
        weight: 500
      });
      _.set(options, "extensions", [[0, { beneficiaries: beneficiaries }]]);
      console.log(JSON.stringify(options));
      const res = await dsteem.broadcast.commentWithOptions(
        comment,
        options,
        PrivateKey.from(key)
      );
      console.log(res);
      return res;
    }
  }
};

export default CommentResolvers;
