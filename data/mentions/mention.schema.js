const Mention = `
  type Mention {
    tx_id: ID
    author: String
    title: String
    body: String
    permlink: String
    parent_author: String
    parent_permlink: String
    timestamp: String 
    json_metadata: String
  }
  
  extend type Query {
    # Mentions of the user
    mentions(username: String!): [Mention]
  }
`;

export default Mention;
