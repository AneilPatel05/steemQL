import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import { Account } from "./accounts/account.schema";
import { BlockHeader, SignedBlock } from "./blocks/block.schema";
import { ChainProperties } from "./globals/globals.schema";
import { CommentInput } from "./comment/comment.schema";
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
    # steemJS
    getTrendingTags(afterTag: String, limit: Int): [Tag]
    # Condensed version of getDiscussionsByXx
    # Allowed values: active, blog, cashout, children, comments, feed, hot,
    # promoted, trending, vote. Can be empty "" to fetch all posts.
    # Note: For blog and feed this is a username.
    getDiscussions(by: String!, query: DiscussionQuery!): [Post]
    # promoted, trending, votes
    getBlockHeader(blockNumber: Int!): BlockHeader 
    getBlock(blockNumber: Int!): SignedBlock 
    getState(path: String!): String
    getTrendingCategories(after: String!, limit: Int): [Tag]
    getBestCategories(after: String!, limit: Int): [Tag]
    getActiveCategories(after: String!, limit: Int): [Tag]
    getRecentCategories(after: String!, limit: Int): [Tag]
    getConfig: Config
    # steemJS::Dynamic Global Properties
    getDynamicGlobalProperties: DynamicGlobalProperties
    getChainProperties: ChainProperties 
    getFeedHistory: String
    getCurrentMedianHistoryPrice: String
    getHardforkVersion: String
    getNextScheduledHardfork: String
    getRewardFund(name: String!): String
    getVestingDelegations(account: String!, from: String, limit: Int): String
    getKeyReferences(key: String): String
    getAccounts(usernames: [String!]!): Account 
    getAccountReferences(accountId: Int): String
    lookupAccountNames(usernames: [String!]!): String
    lookupAccounts(lowerBoundName: String, limit: Int): String
    getAccountCount: Int
    getConversionRequests(username: String!): String
    getAccountHistory(username: String!): String
    getOwnerHistory(username: String!): String
    getRecoveryRequest(username: String!): String
    getTransactionHex(trx: String): String
    getTransaction(trxId: Int!): SignedTransaction
    getRequiredSignatures(trx: String!, availableKeys: String): String
    getPotentialSignatures(trx: String!): String
    verifyAuthority(nameOrId: String!, signers: [String]): String
    getActiveVotes(username: String!, permlink: String!): [Vote]
    getAccountVotes(username: String!): [AccountVote]
    getContent(username: String!, permlink: String!): String
    getContentReplies(parent: String, parentPermlink: String): String
    getDiscussionsByAuthorBeforeDate(username: String!, startPermlink: String!,
      beforeDate: String, limit: Int): [Post]
    getRepliesByLastUpdate(startAuthor: String, startPermlink: String, limit: Int): String
    
    # Get Accounts::dsteem
    getAccounts(usernames: [String!]!): [Account] 
    
  }
  
  type Mutation {
    accountUpdate(wif: String!, account: String!, owner: String, 
      privateActiveKey: String, postingKey: String, publicMemoKey: String!, 
      jsonMetadata: String): User 
    # Create post or comment::dsteem
    comment(comment: CommentInput!, key: String!): Transaction
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
