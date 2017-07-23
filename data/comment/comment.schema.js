export const CommentInput = `
  input CommentInput {
    author: String!
    body: String!
    json_metadata: String!
    parent_author: String!
    parent_permlink: String!
    permlink: String!
    title: String!
  }
`;

export const CommentOptions = `
  input CommentOptions {
    allow_curation_rewards: Boolean
    allow_votes: Boolean
    author: String
    extensions: String
    max_accepted_payout: String
    percent_steem_dollars: Int
    permlink: String
  }
`;
