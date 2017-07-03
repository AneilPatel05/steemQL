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
`;

export default Mention;
