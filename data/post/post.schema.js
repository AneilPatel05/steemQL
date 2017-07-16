const Post = `
  type Post {
    id: ID 
    author: String
    permlink: String
    category: String
    parent_author: String
    parent_permlink: String
    title: String
    body: String
    json_metadata: String
    last_update: String
    created: String
    active: String
    last_payout: String
    depth: Int
    children: Int
    net_rshares: Int
    abs_rshares: Int
    vote_rshares: Int
    children_abs_rshares: Int
    cashout_time: String
    max_cashout_time: String
    total_vote_weight: Int
    reward_weight: Int
    total_payout_value: String
    curator_payout_value: String
    author_rewards: Int
    net_votes: Int
    root_comment: Int
    max_accepted_payout: String
    percent_steem_dollars: Int
    allow_replies: Boolean
    allow_votes: Boolean
    allow_curation_rewards: Boolean
    url: String
    root_title: String
    pending_payout_value: String
    total_pending_payout_value: String
    author_reputation: String
    promoted: String
    body_length: Int
  }
`;

// TODO: Implement `type` for :
// beneficiaries: [],
// active_votes: [ [Object] ],
// reblogged_by: []
// replies: [],

export default Post;
