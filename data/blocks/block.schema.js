export const BlockHeader = `
  type BlockHeader {
    extensions: String
    previous: String
    timestamp: String
    transaction_merkle_root: String
    witness: String
  }
`;

export const SignedBlock = `
  type SignedBlock {
    block_id: String
    extensions: String
    previous: String
    signing_key: String
    timestamp: String
    transaction_ids: [String]
    transaction_merkle_root: String
    transactions: [Transaction]
    witness_signature: String
  }
`;
