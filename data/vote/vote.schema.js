const Vote = `
  type Vote {
    voter: String!
    weight: Int
    rshares: Int
    percent: Int
    reputation: String
    time: String
  }
  
  extend type Query {
    # Votes for a specific post of a user
    activeVotes(username: String!, permlink: String!): [Vote]
    # Returns all votes of an account
    accountVotes(username: String!): [AccountVote] 
  }
  `;

export default Vote;
