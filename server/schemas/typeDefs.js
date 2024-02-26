const typeDefs = `
type UserAccount {
  _id: ID!
  username: String
  email: String
  notes: [UserNotes]
  options: UserOptions
}

type UserNotes {
  _id: ID!
  noteTitle: String
  noteBody: String
}

type UserOptions {
  _id: ID!
  darkMode: Boolean
  fitnessGoal: String
}

type Query {
  getAllUserAccounts: [UserAccount]
  getOneUserAccount(_id: ID!): UserAccount
}

type Mutation {
  setUserOptions(userId: ID!, darkMode: Boolean, fitnessGoal: String): UserAccount
}
`

module.exports = typeDefs;