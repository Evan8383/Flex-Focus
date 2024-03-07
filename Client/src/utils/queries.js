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
  }
`

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
    }
  }
}
` 