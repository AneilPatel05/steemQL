import dsteem from "../connectors/dsteem.connector";
import _ from "lodash";

const DiscussionResolver = {
  Query: {
    /**
     * Get discussions by `string`.
     * @returns {Promise.<*>}
     */
    async getDiscussions(root, args) {
      const { by = "created", query } = args;
      // const by = "created";
      const discussions = await dsteem.database.getDiscussions(by, query);
      console.log(discussions);
      return discussions;
    }
  }
};

export default DiscussionResolver;
