import sql from "mssql";

const TestResolvers = {
  Query: {
    // Get user via steem.
    async commentsSQL(root, args, context) {
      // TODO: Use limit in query. Have to figure out how.
      // const result = await sql.query`SELECT TOP 2 * FROM TxComments
      //   WHERE CONTAINS(title, '%*%')
      //   ORDER BY timestamp DESC`;

      let result = [];
      const request = new sql.Request();
      request.stream = true; // You can set streaming differently for each request
      request.query("select TOP 10 * from TxComments"); // or
      // request.execute(procedure)

      await request.on("recordset", columns => {
        // Emitted once for each recordset in a query
        result = columns;
      });

      await request.on("row", row => {
        // Emitted for each row in a recordset
        result = row;
      });

      request.on("error", err => {
        // May be emitted multiple times
        console.log(err);
      });

      request.on("done", result => {
        // Always emitted as the last one
        console.log(result);
      });
      console.log(result);
      return result.recordset;
    }
  }
};

export default TestResolvers;
