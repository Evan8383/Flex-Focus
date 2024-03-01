const typeDefs = `#graphql
type Auth {
  token: ID!
  user: UserAccount
}

type UserAccount {
  _id: ID!
  username: String
  email: String
  notes: [UserNotes]
  options: UserOptions
  workouts: [Workout]
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
    user: UserAccount!
    name: String!
    category: String!
    muscleGroup: String!
    subMuscleGroup: String
    description: String!
  }

input UserExerciseInput {
  userId: ID!
  name: String!
  category: String!
  muscleGroup: String!
  subMuscleGroup: String
  description: String!
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

type Workout {
  _id: ID!
  workoutName: String
  workoutCategory: String
  workoutDescription: String
  workoutNotes: String
  assignedExercises: [AssignedExercise]
}

type AssignedExercise {
  _id: ID!
  # exercise: Exercise
  goalSets: Int
  goalReps: Int
  goalWeight: Int
  performance: [Performance]
}

type Performance {
  _id: ID!
  numberSet: Int
  dropSet: Boolean
  numberReps: Int
  weight: Int
  # * Subject to change
  dateCompleted: String
}

type Query {
  getAllUserAccounts: [UserAccount]
  getOneUserAccount(userId: ID!): UserAccount
  getAllExercises: [Exercise]
  getOneExercise(_id: ID!): Exercise
  getUserExercises(userId: ID!): [UserExercise]
  getOneUserWorkouts(userId: ID!): [Workout]
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  setUserOptions(userId: ID!, darkMode: Boolean, fitnessGoal: String): UserAccount
  createNewWorkout(userId: ID!, workoutName: String!, workoutCategory: String, workoutSubCategory: [String], workoutDescription: String, workoutNotes: String): Workout
  updateWorkout(workoutId: ID!, workoutName: String, workoutCategory: String, workoutSubCategory: [String], workoutDescription: String, workoutNotes: String): Workout
  deleteWorkout(workoutId: ID!, userId: ID!): Workout
  createUserExercise(input: UserExerciseInput!): UserExercise
  editUserExercise(_id: ID!, input: UserExerciseInput): UserExercise
  deleteUserExercise(_id: ID!): Boolean
}
`
//  type UserExercise {
//   _id: ID!
//   userId: UserAccount!
//   name: String!
//   category: String!
//   muscleGroup: String!
//   subMuscleGroup: String
//   description: String!
// }

// input UserExerciseInput {
//   userId: ID
//   name: String
//   category: String
//   muscleGroup: String
//   subMuscleGroup: String
//   description: String
// }

module.exports = typeDefs;