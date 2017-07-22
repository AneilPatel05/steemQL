import dsteem from "../connectors/dsteem.connector";
import steem from "steem";
import { PrivateKey } from "dsteem";
import _ from "lodash";
import moment from "moment";

const CommentResolvers = {
  Mutation: {
    async comment(root, args) {
      const { comment, key } = args;
      console.log(comment);
      const res = await steem.broadcast.commentAsync(
        key,
        comment.parent_author,
        comment.parent_permlink,
        comment.author,
        comment.permlink,
        comment.title,
        comment.body,
        comment.json_metadata
      );
      console.log(res);
      return res;
    }
    // async comment(root, args) {
    //   let { comment, key } = args;
    //   key = PrivateKey.fromString(key);
    //   console.log(key.toString());
    //   const result = await dsteem.broadcast.comment(comment, key);
    //   return result;
    // }
  }
};

export default CommentResolvers;
