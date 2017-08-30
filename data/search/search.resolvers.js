import rp from "request-promise";

const SearchResolvers = {
  Query: {
    async search(root, args) {
      const { searchString } = args;

      const result = await rp(
        `https://api.asksteem.com/search?q=${searchString}`
      );
      return JSON.parse(result);
    }
  }
};

export default SearchResolvers;
