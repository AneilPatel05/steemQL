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

    async comment(root, args) {
      let { comment, key } = args;
      const result = await dsteem.broadcast.comment(
        comment,
        PrivateKey.from(key)
      );
      console.log(result);
      return result;
    }
  }
};

export default CommentResolvers;
