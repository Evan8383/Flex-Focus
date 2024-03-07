import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`

export const ADD_NEW_NOTE = gql`
mutation Mutation($userId: ID!, $noteTitle: String!, $noteBody: String!) {
  addNote(userId: $userId, noteTitle: $noteTitle, noteBody: $noteBody) {
    _id
  }
}
`
export const DELETE_NOTE = gql`
  mutation Mutation($userId: ID!, $noteId: ID!) {
  deleteNote(userId: $userId, noteId: $noteId) {
    _id
  }
}
`

export const DELETE_WORKOUT = gql`
mutation Mutation($workoutId: ID!, $userId: ID!) {
  deleteWorkout(workoutId: $workoutId, userId: $userId) {
    _id
  }
}
`

export const ADD_WORKOUT = gql`
mutation CreateNewWorkout($userId: ID!, $workoutName: String!, $workoutCategory: String, $workoutDescription: String) {
  createNewWorkout(userId: $userId, workoutName: $workoutName, workoutCategory: $workoutCategory, workoutDescription: $workoutDescription) {
    _id
    workoutName
  }
}
`