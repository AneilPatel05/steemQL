const Auth = `
  extend type Query {
    # Fetch private keys for provided user
   privateKeys(name: String!, password: String!, roles:[String]!): String
  }
`

export default Auth