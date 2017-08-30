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
    search(searchString: String!): Search
  }
`;

export default Search;
