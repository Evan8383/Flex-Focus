import { gql } from '@apollo/client';

export const GET_DASHBOARD = gql`
query GetOneUserAccount($userId: ID!) {
  getOneUserAccount(userId: $userId) {
    _id
    username
    notes {
      _id
      noteBody
      noteTitle
    }
    workouts {
      _id
      workoutCategory
      workoutDescription
      workoutName
      workoutNotes
    }
    }
  }`

export const GET_WORKOUTS = gql`
query GetOneUserAccount($userId: ID!) {
  getOneUserAccount(userId: $userId) {
    _id
    username
    workouts {
      _id
      workoutCategory
      workoutDescription
      workoutName
      assignedExercises {
        _id
        name
      }
    }
  }
}`

export const GET_ONE_EXERCISE = gql`
query GetOneExercise($id: ID!) {
  getOneExercise(_id: $id) {
    name
    muscleGroup
    description
  }
}
`

export const GET_USER_WORKOUT_DATA = gql`
query GetOneUserAccount($userId: ID!) {
  getOneUserAccount(userId: $userId) {
    _id
    workouts {
      workoutName
      workoutCategory
      assignedExercises {
        name
        muscleGroup
        description
        _id
      }
    }
  }
}`

export const GET_ALL_EXERCISES = gql`
query GetAllExercises {
  getAllExercises {
    _id
    description
    muscleGroup
    name
  }
}`

export const GET_ONE_WORKOUT = gql`
query GetOneWorkout($workoutId: ID!) {
  getOneWorkout(workoutId: $workoutId) {
    workoutName
    workoutCategory
    workoutDescription
    workoutNotes
    assignedExercises {
      _id
      name
      muscleGroup
      description
    }
  }
}`