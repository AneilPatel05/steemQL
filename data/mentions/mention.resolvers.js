import _ from "lodash";
// import { Mention } from "../connectors/steemsql.connector";
import sql from "mssql";

const MentionResolvers = {
  Query: {
    // Get user via steem.
    async mentions(root, args, context) {
      const { username, limit = 25 } = args;
      const query = "@" + username;

      // TODO: Use limit in query. Have to figure out how.
      const result = await sql.query`SELECT TOP 25 * FROM TxComments 
        WHERE CONTAINS(body, ${query})
        OR CONTAINS(title, ${query}) 
        ORDER BY timestamp DESC`;
      return result.recordset;
    }
  }
};

export default MentionResolvers;
