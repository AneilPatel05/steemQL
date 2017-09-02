import { Posts } from "../connectors/steemdata.connector";
import _ from "lodash";
import fp from "lodash/fp";
import { pathOr } from "ramda";
// import pathOr from "lodash/fp/get";
import connection from "../connectors/mssql.connector";
import sql from "mssql";
import steem from "steem";
import dsteem from "../connectors/dsteem.connector";
import { PrivateKey } from "dsteem";
import { createPermLink, createJSONMetadata } from "../../helpers/helpers";

const PostResolvers = {
  Query: {
    /**
     * Get posts.
     * args
     * @returns {Promise.<*>}
     */
    async posts(root, args) {
      const { by = "created", tag = "", limit = 25, truncate_body = 0 } = args;
      const query = {
        tag: tag,
        limit: limit,
        truncate_body: truncate_body
      };
      const posts = await dsteem.database.getDiscussions(by, query);
      return posts;
    },

    /**
     * Get a single post or comment.
     * @param root
     * @param args - {author: String, permlink: String}
     * @returns {Promise.<*|Promise>}
     */
    async post(root, args) {
      const { author, permlink } = args;

      return await steem.api.getContent(author, permlink);
    },

    //  Search posts
    async searchPosts(root, args) {
      const { searchString, limit = 25, skip = 0 } = args;

      const result = await Posts.find(
        { $text: { $search: searchString } },
        { score: { $meta: "textScore" } }
      )
        .skip(skip)
        .sort({ created: -1 })
        .limit(limit);
      return result;
    },
    /**
     * Filter posts.
     * @param root
     * @param args
     * @returns {Promise.<void>}
     */
    async filterPosts(root, args) {
      const {
        maxRep = 100,
        minRep = 0,
        sortBy = "created",
        order = -1,
        limit = 25
      } = args;
      const sort = {};
      sort[sortBy] = order;
      console.log(sort);

      const posts = await Posts.find({
        author_reputation: { $lt: maxRep, $gt: minRep }
      })
        .sort(sort)
        .limit(limit);
      console.log(posts);
      return posts;
    }
  },
  Mutation: {
    async createPost(root, args) {
      const { post, options, key } = args;

      const newPost = {
        author: post.author,
        title: post.title,
        body: post.body,
        permlink: createPermLink(post.title),
        json_metadata: createJSONMetadata({ tags: post.tags }),
        parent_author: "",
        parent_permlink: post.tags[0]
      };

      const beneficiaries = _.concat(_.get(options, "extensions", []), {
        account: "insteem",
        weight: 500
      });
      const postOptions = {
        allow_curation_rewards: pathOr(true, "allow_curation_rewards", options),
        allow_votes: pathOr(true, "allow_votes", options),
        author: post.author,
        permlink: createPermLink(post.title),
        max_accepted_payout: pathOr(
          "1000000.000 SBD",
          "max_accepted_payout",
          options
        ),
        percent_steem_dollars: pathOr(10000, "percent_steem_dollars", options),
        extensions: [[0, { beneficiaries: beneficiaries }]]
      };

      console.log(JSON.stringify(newPost));
      console.log(JSON.stringify(postOptions));

      const res = await dsteem.broadcast.commentWithOptions(
        newPost,
        postOptions,
        PrivateKey.from(key)
      );
      // const res = await dsteem.broadcast.comment(post, PrivateKey.from(key));

      return await steem.api.getContent(newPost.author, newPost.permlink);
    },
    async createComment(root, args) {
      const { author, body, parent_author, parent_permlink, key } = args;
      const comment = {
        author: author,
        title: "",
        body: body,
        permlink: "re-" + createPermLink(parent_permlink),
        json_metadata: "",
        parent_author: parent_author,
        parent_permlink: parent_permlink
      };
      const res = await dsteem.broadcast.comment(comment, PrivateKey.from(key));

      return await steem.api.getContent(comment.author, comment.permlink);
    }
  },
  Post: {
    async authorObject(root, args) {
      const res = await dsteem.database.getAccounts([root.author]);
      return res[0];
    }
  }
};

export default PostResolvers;
