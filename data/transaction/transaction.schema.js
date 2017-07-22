export const Transaction = `
  type Transaction {
    ref_block_num: Int
    ref_block_prefix: String 
    expiration: String 
    operations: String
    extensions: String
    signatures: [String]
  }
`;
