import steem from "../connectors/steemjs.connector.js";
import _ from "lodash";

const GlobalsResolvers = {
  Query: {
    /**
     *
     * @param root
     * @returns {Promise.<*>}
     */
    async getConfig(root) {
      const config = await steem.api.getConfig();
      console.log(config);
      return config;
    }
  }
};

export default GlobalsResolvers;
