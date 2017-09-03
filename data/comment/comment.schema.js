export const Comment = `
  input CommentInput {
    author: String!
    body: String!
    json_metadata: String!
    parent_author: String!
    parent_permlink: String!
    permlink: String!
    title: String!
  }

  input CommentOptions {
    allow_curation_rewards: Boolean
    allow_votes: Boolean
    author: String
    extensions: [ExtensionInput] 
    max_accepted_payout: String
    percent_steem_dollars: Int
    permlink: String
  }

  input ExtensionInput {
    account: String!
    weight: Int!
  }
  
  extend type Query {
    # Replies for a post
    replies(parent: String, parentPermlink: String): Post 
  }
`;
