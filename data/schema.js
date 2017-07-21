import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import { Account } from "./accounts/account.schema";
import Config from "./globals/config.schema";
import DGP from "./globals/dgp.schema";
import Tag from "./tag/tag.schema";
import Post from "./post/post.schema";
import User from "./user/user.schema";
import UserHistory from "./user/userHistory.schema";
import Vote from "./vote/vote.schema";
import AccountVote from "./vote/accountVote.schema";
import Mention from "./mentions/mention.schema";
import { DiscussionQuery } from "./discussions/discussion.schema";
import Test from "./test/test.schema";

const rootSchema = `
  type Query {
    # Get Accounts::dsteem
    getAccounts(usernames: [String!]!): [Account] 
    # Number of accounts::steemJS
    accountCount: Int
    # Votes of the account::steemJS
    accountVotes(username: String!): [AccountVote]
    # Votes for a post::steemJS
    activeVotes(username: String!, permlink: String!): [Vote]
    # Blockchain config::steemJS
    config: Config
    # Posts by tag::steemJS
    discussionsByCreated(tag: String!, limit: Int):[Post]
    # Get Discucssion::dsteem
    getDiscussions(by: String, query: DiscussionQuery): [Post]
    # Dynamic Global Properties::steemJS
    dynamicGlobalProperties: DGP
    # Mentions of the user::steemSQL
    mentions(username: String!): [Mention]
    # Search indexed field from posts::steemJSata
    searchPosts(searchString: String!, limit: Int, skip: Int): [Post]
    # Get posts for trending tags::steemJS
    trendingTags(afterTag: String!, limit: Int): [Tag]
    # Get posts::steemJSata
    posts: [Post]
    # Fetch private keys for provided user::steemJS
    privateKeys(name: String!, password: String!, roles:[String]!): String
    # Get user data for username::steemJS
    user(username: String!): User 
    # Get user data for a list of provided users::steemJS
    users(users: [String]!, limit: Int): [User]
    # Get history for user, returns a string at the moment::steemJS
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
  Account,
  Config,
  DGP,
  Tag,
  Post,
  User,
  UserHistory,
  Vote,
  AccountVote,
  Mention,
  DiscussionQuery,
  Test
];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
