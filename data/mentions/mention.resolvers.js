import _ from "lodash";
// import { Mention } from "../connectors/steemsql.connector";
import connection from "../connectors/mssql.connector";
import Request from "tedious";
import sql from "mssql";

const MentionResolvers = {
  Query: {
    // Get user via steem.
    async mentions(root, args, context) {
      // SELECT author, title, body, url FROM TxComments WHERE CONTAINS(title,
      // '@arcange')
      const { username, limit = 25 } = args;
      const query = "@" + username;

      // TODO: Use limit in query. Have to figure out how.
      const result = await sql.query`SELECT TOP 25 * FROM TxComments 
        WHERE CONTAINS(body, ${query})
        OR CONTAINS(title, ${query}) 
        ORDER BY timestamp DESC`;
      console.log(result.recordset);
      return result.recordset;
    }
  }
};

export default MentionResolvers;
