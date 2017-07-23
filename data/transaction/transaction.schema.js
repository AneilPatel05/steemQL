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

export const SignedTransaction = `
  type SignedTransaction {
    ref_block_num: String
    ref_block_prefix: String
    expiration: String
    extensions: String
    operations: String
    signatures: [String]
  }
`;
