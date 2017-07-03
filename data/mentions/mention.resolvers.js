import _ from "lodash";
import { Mention } from "../connectors/steemsql.connector";

const MentionResolvers = {
  Query: {
    // Get user via steem.
    async mentions(root, args, context) {
      // SELECT author, title, body, url FROM TxComments WHERE CONTAINS(title, '@arcange')

      const result = await Mention.findAll({ limit: 10 });
      console.log(result);
      result.map(comment => {
        console.log(comment.dataValues.author);
      });

      // knex
      //   .select("author", "title", "body")
      //   .from("TxComments")
      //   .where("title", "contains", "@sarasate")
      //   .then(res => {
      //     console.log(res);
      //   });

      return result;
    }
  }
};

export default MentionResolvers;
