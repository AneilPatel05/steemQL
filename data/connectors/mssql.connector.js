var sql = require("mssql"), connPoolPromise = null;

const config = {
  user: "steemit",
  password: "steemit",
  server: "sql.steemsql.com",
  database: "DBSteem"
};

const sqlServer = sql
  .connect(config)
  // .then(() => {
  // return sql.query`select * from mytable where id = ${value}`;
  // })
  .then(result => {
    console.dir("mssql connection success");
  })
  .catch(err => {
    console.log(err);
    // ... error checks
  });
