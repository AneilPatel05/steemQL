import steem from "../connectors/steemjs.connector.js";
import dsteem from "../connectors/dsteem.connector";
import _ from "lodash";

const GlobalsResolvers = {
  Query: {
    /**
     * Get global Config object.
     * @param root
     * @returns {Promise.<*>}
     */
    async getConfig(root) {
      const config = await steem.api.getConfig();
      return config;
    },

    /**
     * Get Dynamic Global Properties object.
     * @returns {Promise.<*>}
     */
    async getDynamicGlobalProperties() {
      const dgp = await steem.api.getDynamicGlobalProperties();
      return dgp;
    },

    async getChainProperties() {
      return await dsteem.database.getChainProperties();
    }
  }
};

export default GlobalsResolvers;
