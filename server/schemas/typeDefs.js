const typeDefs = `#graphql
type UserAccount {
  _id: ID!
  username: String
  email: String
}

type Exercise {
  _id: ID!
  name: String!
  category: String!
  muscleGroup: String!
  subMuscleGroup: String
  description: String!
}

type UserExercise {
    _id: ID!
    userId: UserAccount!
    name: String!
    category: String!
    muscleGroup: String!
    subMuscleGroup: String
    description: String!
  }

input UserExerciseInput {
  userId: ID
  name: String
  category: String
  muscleGroup: String
  subMuscleGroup: String
  description: String
}

type Query {
  getAllUserAccounts: [UserAccount]
  getOneUserAccount(_id: ID!): UserAccount
  getAllExercises: [Exercise]
  getOneExercise(_id: ID!): Exercise
  getUserExercises(userId: ID!): [UserExercise]
}

type Mutation {
    createUserExercise(input: UserExerciseInput!): UserExercise
    editUserExercise(_id: ID!, userExerciseInput: UserExerciseInput): UserExercise
    deleteUserExercise(_id: ID!): Boolean
  }

`

module.exports = typeDefs;