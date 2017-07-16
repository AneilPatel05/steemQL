// import mongojs from "mongojs";
//
// const databaseUrl = "steemit:steemit@mongo1.steemdata.com:27017/SteemData";
//
// const collections = [
//   "Accounts",
//   "Posts",
//   "Operations",
//   "AccountOperation",
//   "PriceHistory"
// ];
//
// const db = mongojs(databaseUrl, collections);
//
// export default db;

import mongoose from "mongoose";
mongoose.Promise = require("bluebird");

const databaseUrl =
  "mongodb://steemit:steemit@mongo1.steemdata.com:27017/SteemData";

mongoose.connect(databaseUrl, { useMongoClient: true });

export default mongoose;
const schema = mongoose.Schema(
  { title: String, body: String, created: String },
  { collection: "Posts" }
);

export const Posts = mongoose.model("Post", schema);
//
// const res = Posts.findOne({}, (err, res) => {
//   console.log(err, res);
// });
// console.log(res);
