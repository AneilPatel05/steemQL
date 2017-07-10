import { MongoClient } from "mongodb";

const startMongo = async () => {
  // Connection URL
  const MONGO_URL = "steemit:steemit@mongo1.steemdata.com:27017/SteemData";

  const db = await MongoClient.connect(MONGO_URL);
  const Posts = db.collection("Posts");
};

export default startMongo;
