import { makeExecutableSchema } from "graphql-tools";
import GraphQLJSON from "graphql-type-json";
import resolvers from "./resolvers";
import User from "./user/user.schema";
import Mention from "./mentions/mention.schema";

const rootSchema = `
  type Query {
    user(username: String!, limit: Int): User 
    users(users: [String]!, limit: Int): [User]
    mentions(username: String!): [Mention]
  }
  
  scalar Date
  
  scalar JSON

  schema {
    query: Query
  }
`;

const typeDefs = [rootSchema, User, Mention];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
