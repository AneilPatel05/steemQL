import { makeExecutableSchema } from "graphql-tools";
import GraphQLJSON from "graphql-type-json";
import resolvers from "./resolvers";
import User from "./user/user.schema";

const rootSchema = `
  type Query {
    user(username: String!): User 
  }
  
  scalar Date
  
  scalar JSON

  schema {
    query: Query
  }
`;

const typeDefs = [rootSchema, User];

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
