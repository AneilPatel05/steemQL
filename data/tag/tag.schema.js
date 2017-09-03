const Tag = `
  type Tag {
    name: String!
    total_payouts: String
    net_votes: Int
    top_posts: Int
    comments: Int
    trending: String
  }
  
  extend type Query {
    trendingTags(
    # Starting tag to filter from 
    afterTag: String, 
    # Default: 25 
    limit: Int): [Tag] 
  }
`;

export default Tag;
