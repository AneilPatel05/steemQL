import _ from "lodash";
import GlobalsResolvers from "./globals/globals.resolver";
import AuthResolvers from "./auth/auth.resolvers";
import TagResolvers from "./tag/tag.resolver";
import UserResolvers from "./user/user.resolver";
import VoteResolvers from "./vote/vote.resolver";
import MentionResolvers from "./mentions/mention.resolvers";
import PostResolvers from "./post/post.resolver";
import TestResolvers from "./test/test.resolvers";

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
  AuthResolvers,
  TagResolvers,
  UserResolvers,
  VoteResolvers,
  MentionResolvers,
  PostResolvers,
  TestResolvers
);
