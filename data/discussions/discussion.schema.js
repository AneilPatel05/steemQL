// Input type for a discussion query. Use in combination with `getDiscussion`.
export const DiscussionQuery = `
  input DiscussionQuery {
    filter_tags: [String]
    limit: Int!
    parent_author: String
    parent_permlink: String
    select_author: [String]
    select_tags: [String]
    start_author: String
    start_permlink: String
    tag: String!
    truncate_body: Int
  }
`;
