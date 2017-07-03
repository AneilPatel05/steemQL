import Sequelize from "sequelize";
import _ from "lodash";

const db = new Sequelize("DBSteem", "steemit", "steemit", {
  dialect: "mssql",
  host: "sql.steemsql.com"
});

const Mention = db.define(
  "TxComments",
  {
    author: Sequelize.STRING,
    title: Sequelize.STRING,
    body: Sequelize.STRING
  },
  { timestamps: false }
);

const UserModel = db.define("user", {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING }
});

const PostModel = db.define("post", {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING }
});

UserModel.hasMany(PostModel);
PostModel.belongsTo(UserModel);

// create mock data with a seed, so we always get the same
// casual.seed(123);
// db.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     return AuthorModel.create({
//       firstName: casual.first_name,
//       lastName: casual.last_name
//     }).then(author => {
//       return author.createPost({
//         title: `A post by ${author.firstName}`,
//         text: casual.sentences(3)
//       });
//     });
//   });
// });

// const Mention = db.models.mention;
const User = db.models.user;
const Post = db.models.post;

export { User, Post, Mention };

export default db;
