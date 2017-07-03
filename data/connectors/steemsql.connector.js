import Sequelize from "sequelize";
import _ from "lodash";

const db = new Sequelize("steemit", "steemit", "steemit", {
  dialect: "mssql",
  host: "https://sql.steemsql.com"
});

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

const User = db.models.user;
const Post = db.models.post;

export { User, Post };

export default db;
