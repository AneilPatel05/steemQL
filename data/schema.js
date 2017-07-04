import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import Config from "./globals/config.schema";
import DGP from "./globals/dgp.schema";
import Tag from "./tag/tag.schema";
import Post from "./post/post.schema";
import User from "./user/user.schema";
import Mention from "./mentions/mention.schema";

const rootSchema = `
  type Query {
    user(username: String!): User 
    users(users: [String]!, limit: Int): [User]
    mentions(username: String!): [Mention]
    getConfig: Config
    getDynamicGlobalProperties: DGP
    getTrendingTags(afterTag: String!, limit: Int): [Tag]
    # Limit <= 100
    getDiscussionsByCreated(tags: String!, limit: Int):[Post]
  }
  
  scalar Date
  
  scalar JSON

  schema {
    query: Query
  }
`;

const typeDefs = [rootSchema, Config, DGP, Tag, Post, User, Mention];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
