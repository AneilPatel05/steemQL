export const ChainProperties = `
  type ChainProperties {
    account_creation_fee: String
    minimum_block_size: Int
    sbd_interest_rate: Int
  }
  
  extend type Query {
    chainProperties: ChainProperties 
    config: Config
    dynamicGlobalProperties: DynamicGlobalProperties
  }
`;
