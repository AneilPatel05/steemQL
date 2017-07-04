import _ from "lodash";
import GlobalsResolvers from "./globals/globals.resolver";
import UserResolvers from "./user/user.resolver";
import MentionResolvers from "./mentions/mention.resolvers";

const rootResolvers = {
  Query: {},

  Date: {
    __parseValue(value) {
      return new Date(value);
    },
    __serialize(value) {
      return value.getTime();
    },
    __parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }
};

export default _.merge(
  rootResolvers,
  GlobalsResolvers,
  UserResolvers,
  MentionResolvers
);
