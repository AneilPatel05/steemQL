export const Transaction = `
  type Transaction {
    ref_block_num: Int
    ref_block_prefix: String 
    expiration: String 
    operations: String
    extensions: String
    signatures: [String]
  }

  type TransactionConfirmation {
    block_num: Int
    expired: Boolean
    id: String
    trx_num: Int
  }

  type SignedTransaction {
    ref_block_num: String
    ref_block_prefix: String
    expiration: String
    extensions: String
    operations: String
    signatures: [String]
  }
  
  extend type Query {
    transaction(transactionId: Int!): SignedTransaction 
  }
`;
