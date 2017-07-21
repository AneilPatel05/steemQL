import dsteem from "../connectors/dsteem.connector";
import _ from "lodash";
import moment from "moment";

const AccountResolvers = {
  Query: {
    /**
     * Get a list of accounts.
     * @param root
     * @param args.users - Array of usernames.
     * @returns {Promise.<*>}
     */
    async getAccounts(root, args) {
      const { usernames } = args;
      const users = await dsteem.database.getAccounts(usernames);
      return users;
    }
  }
};

export default AccountResolvers;
