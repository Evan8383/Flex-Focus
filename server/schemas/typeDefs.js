const typeDefs = `
type UserAccount {
  _id: ID!
  username: String
  email: String
}
type Exercise {
  _id: ID!
  name: String
  category: String
  muscleGroup: String
  subMuscleGroup: String
  description: String
}
type Query {
  getAllUserAccounts: [UserAccount]
  getOneUserAccount(_id: ID!): UserAccount
}
type Query {
  getAllExercises: [Exercise]
  getOneExercise(_id: ID!): Exercise
}
`

module.exports = typeDefs;