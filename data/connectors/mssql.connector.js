const sql = require("mssql");

const mssqlServer = async () => {
  try {
    const pool = await sql.connect(
      "mssql://steemit:steemit@sql.steemsql.com/DBSteem"
    );
    const result = await sql.query`select * from TxComments WHERE CONTAINS(body, '@sarasate')`;
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export default mssqlServer;
