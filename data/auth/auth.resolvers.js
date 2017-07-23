import steem from "../connectors/steemjs.connector";

const AuthResolvers = {
  Query: {
    async getPrivateKeys(root, args) {
      const { name, password, roles = [] } = args;
      const result = steem.auth.getPrivateKeys(name, password, roles);
      console.log(JSON.stringify(result));
      return JSON.stringify(result);
    }
  }
};

export default AuthResolvers;
