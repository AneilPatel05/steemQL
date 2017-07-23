import steem from "steem";

const ContentResolvers = {
  Query: {
    async getContent(root, args) {
      const { author, permlink } = args;
      return await steem.api.getContent(author, permlink);
    },

    async getContentReplies(root, args) {
      const { parent, parentPermlink } = args;
      return await steem.api.getContentReplies(parent, parentPermlink);
    },

    async getDiscussionsByAuthorBeforeDate(root, args) {
      const { author, startPermlink, beforeDate, limit = 25 } = args;
      // TODO: Configure beforeDate to accept any kind of date input.
      return await steem.api.getDiscussionsByAuthorBeforeDate(
        author,
        startPermlink,
        beforeDate,
        limit
      );
    },

    async getRepliesByLastUpdate(root, args) {
      const { startAuthor, startPermlink, limit = 25 } = args;
      return await steem.api.getRepliesByLastUpdate(
        startAuthor,
        startPermlink,
        limit
      );
    }
  }
};

export default ContentResolvers