import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import { Account } from "./accounts/account.schema";
import { BlockHeader, SignedBlock } from "./blocks/block.schema";
import { ChainProperties } from "./globals/globals.schema";
import { CommentInput, CommentOptions } from "./comment/comment.schema";
import Config from "./globals/config.schema";
import DGP from "./globals/dgp.schema";
import Tag from "./tag/tag.schema";
import {
  SignedTransaction,
  Transaction
} from "./transaction/transaction.schema";
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

    # Posts by tag::steemJS
    discussionsByCreated(tag: String!, limit: Int):[Post]
    @deprecated(reason: "Replaced by getDiscussions()")

    # Mentions of the user
    mentions(username: String!): [Mention]
    # Search indexed field from posts
    searchPosts(searchString: String!, limit: Int, skip: Int): [Post]
    # Get posts for trending tags
    posts: [Post]
   # Get user data for username::steemJS
    user(username: String!): User 
    # Get user data for a list of provided users::steemJS
    users(users: [String]!, limit: Int): [User]
    
    getTrendingTags(afterTag: String, limit: Int): [Tag]
    # Condensed version of getDiscussionsByXx
    # Allowed values: active, blog, cashout, children, comments, feed, hot,
    # promoted, trending, vote. Can be empty "" to fetch all posts.
    # Note: For blog and feed this is a username.
    # promoted, trending, votes
    getDiscussions(by: String!, query: DiscussionQuery!): [Post]
    getBlockHeader(blockNumber: Int!): BlockHeader 
    getBlock(blockNumber: Int!): SignedBlock 
    getConfig: Config
    getDynamicGlobalProperties: DynamicGlobalProperties
    getChainProperties: ChainProperties 
    getAccounts(usernames: [String!]!): [Account] 
    lookupAccountNames(usernames: [String!]!): [Account] 
    lookupAccounts(lowerBoundName: String!, limit: Int): [String]
    getAccountCount: Int
    getAccountHistory(username: String!, from: Int, limit: Int): String 
    getTransaction(trxId: Int!): SignedTransaction
    getActiveVotes(username: String!, permlink: String!): [Vote]
    getAccountVotes(username: String!): [AccountVote]
    getContent(username: String!, permlink: String!): Post 
    getContentReplies(parent: String, parentPermlink: String): Post 
    getDiscussionsByAuthorBeforeDate(username: String!, startPermlink: String,
      beforeDate: String!, limit: Int): [Post]
    getRepliesByLastUpdate(startAuthor: String, startPermlink: String, limit: Int): [Post] 
    getAccountVotes(username: String!): [AccountVote]    
     # Votes for a post::steemJS
    getActiveVotes(username: String!, permlink: String!): [Vote]
    # Fetch private keys for provided user::steemJS
    getPrivateKeys(name: String!, password: String!, roles:[String]!): String
   }
  
  type Mutation {
    accountUpdate(wif: String!, account: String!, owner: String, 
      privateActiveKey: String, postingKey: String, publicMemoKey: String!, 
      jsonMetadata: String): User 
    # Create post or comment::steemJS
    comment(comment: CommentInput!, key: String!): Transaction
    # Delete comment::steemJS
    deleteComment(author: String!, permlink: String!, key: String!): String
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
  BlockHeader,
  ChainProperties,
  Config,
  CommentInput,
  CommentOptions,
  DGP,
  Tag,
  Transaction,
  Post,
  SignedBlock,
  SignedTransaction,
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
