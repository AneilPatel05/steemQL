import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import { Account } from "./accounts/account.schema";
import Auth from "./auth/auth.schema";
import { BlockHeader } from "./blocks/block.schema";
import { ChainProperties } from "./globals/globals.schema";
import { Comment } from "./comment/comment.schema";
import Config from "./globals/config.schema";
import DGP from "./globals/dgp.schema";
import Tag from "./tag/tag.schema";
import { Transaction } from "./transaction/transaction.schema";
import Post from "./post/post.schema";
import User from "./user/user.schema";
import UserHistory from "./user/userHistory.schema";
import Vote from "./vote/vote.schema";
import AccountVote from "./vote/accountVote.schema";
import Mention from "./mentions/mention.schema";
import Search from "./search/search.schema";

const rootSchema = `
  type Query {

    # Posts by tag::steemJS
    discussionsByCreated(tag: String!, limit: Int):[Post]
    @deprecated(reason: "Replaced by getDiscussions()")


   }
  
  type Mutation {
    
    # Convenience method to create a comment
    createComment(author: String!, body: String!, parent_author: String!, 
      parent_permlink: String!, key: String!): Post
    # Update account data
    accountUpdate(wif: String!, account: String!, owner: String, 
      privateActiveKey: String, postingKey: String, publicMemoKey: String!, 
      jsonMetadata: String): User 
    # Create post or comment::dsteem
    comment(comment: CommentInput!, key: String!): TransactionConfirmation
    # Comment with options::dsteem
    commentWithOptions(comment: CommentInput!, options: CommentOptions!, key: String!):
      TransactionConfirmation
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
  Search,
  Account,
  AccountVote,
  Post,
  Comment,
  Vote,
  Tag,
  Mention,
  BlockHeader,
  ChainProperties,
  Config,
  DGP,
  Transaction,
  User,
  UserHistory,
  Auth
];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
