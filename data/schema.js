import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import Config from "./globals/config.schema";
import DGP from "./globals/dgp.schema";
import User from "./user/user.schema";
import Mention from "./mentions/mention.schema";

const rootSchema = `
  type Query {
    user(username: String!, limit: Int): User 
    users(users: [String]!, limit: Int): [User]
    mentions(username: String!): [Mention]
    getConfig: Config
    getDynamicGlobalProperties: DGP
  }
  
  scalar Date
  
  scalar JSON

  schema {
    query: Query
  }
`;

const typeDefs = [rootSchema, Config, DGP, User, Mention];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
