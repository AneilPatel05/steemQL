const Search = `
  type Search {
    error: Boolean
    hits: Int 
    results: [Result]
  }
  
  type Result {
    created: String
    net_votes: Int 
    permlink: String
    type: String
    title: String
    tags: [String]
    summary: String
    children: Int
    author: String
  } 
  
  extend type Query {
    # Search powered by asksteem.com.
    # Returns a set of posts with limited properties.
    search(searchString: String!): Search
  }
`;

export default Search;
