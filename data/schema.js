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
    # Number of accounts::steemd
    accountCount: Int
    # Votes of the account::steemd
    accountVotes(username: String!): [AccountVote]
    # Votes for a post::steemd
    activeVotes(username: String!, permlink: String!): [Vote]
    # Blockchain config::steemd
    config: Config
    # Posts by tag::steemd
    discussionsByCreated(tag: String!, limit: Int):[Post]
    # Dynamic Global Properties::steemd
    dynamicGlobalProperties: DGP
    # Mentions of the user::steemSQL
    mentions(username: String!): [Mention]
    searchPosts(searchString: String!, limit: Int, skip: Int): [Post]
    trendingTags(afterTag: String!, limit: Int): [Tag]
    posts: [Post]
    privateKeys(name: String!, password: String!, roles:[String]!): String
    user(username: String!): User 
    users(users: [String]!, limit: Int): [User]
    userHistory(username: String!, from: Int, limit: Int): String 
    # Limit <= 100
  }
  
  type Mutation {
    accountUpdate(wif: String!, account: String!, owner: String, 
      privateActiveKey: String, postingKey: String, publicMemoKey: String!, 
      jsonMetadata: String): User 
  }
  
  scalar Date
  
  scalar JSON

  schema {
    query: Query
    mutation: Mutation
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
