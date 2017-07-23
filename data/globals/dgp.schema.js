const DGP = `
  type DynamicGlobalProperties {
    id: Int
    head_block_number: Int
    head_block_id: String
    time: String
    current_witness: String
    total_pow: Int
    num_pow_witnesses: Int
    virtual_supply: String
    current_supply: String
    confidential_supply: String
    current_sbd_supply: String
    confidential_sbd_supply: String
    total_vesting_fund_steem: String
    total_vesting_shares: String
    total_reward_fund_steem: String
    total_reward_shares2: String
    pending_rewarded_vesting_shares: String
    pending_rewarded_vesting_steem: String
    sbd_interest_rate: Int
    sbd_print_rate: Int
    average_block_size: Int
    maximum_block_size: Int
    current_aslot: Int
    recent_slots_filled: String
    participation_count: Int
    last_irreversible_block_num: Int
    max_virtual_bandwidth: String
    current_reserve_ratio: Int
    vote_power_reserve_rate: Int
  }
`;

export default DGP;
