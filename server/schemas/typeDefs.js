const typeDefs = `
type UserAccount {
  _id: ID!
  username: String
  email: String
}
type Query {
  getAllUserAccounts: [UserAccount]
  getOneUserAccount(_id: ID!): UserAccount
}
`

module.exports = typeDefs;