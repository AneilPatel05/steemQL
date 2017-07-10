import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import Config from "./globals/config.schema";
import DGP from "./globals/dgp.schema";
import Tag from "./tag/tag.schema";
import Post from "./post/post.schema";
import User from "./user/user.schema";
import UserHistory from "./user/userHistory.schema";
import Vote from "./vote/vote.schema";
import AccountVote from "./vote/accountVote.schema";
import Mention from "./mentions/mention.schema";
import Test from "./test/test.schema";

const rootSchema = `
  type Query {
    user(username: String!): User 
    users(users: [String]!, limit: Int): [User]
    accountCount: Int
    userHistory(username: String!, from: Int, limit: Int): String 
    mentions(username: String!): [Mention]
    config: Config
    dynamicGlobalProperties: DGP
    trendingTags(afterTag: String!, limit: Int): [Tag]
    # Limit <= 100
    discussionsByCreated(tag: String!, limit: Int):[Post]
    commentsSQL: String
    activeVotes(username: String!, permlink: String!): [Vote]
    accountVotes(username: String!): [AccountVote]
    searchPosts(searchString: String!): [Post]
  }
  
  scalar Date
  
  scalar JSON

  schema {
    query: Query
  }
`;

const typeDefs = [
  rootSchema,
  Config,
  DGP,
  Tag,
  Post,
  User,
  UserHistory,
  Vote,
  AccountVote,
  Mention,
  Test
];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
