import Exercises from '../components/Exercises'
import Auth from '../utils/auth'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

import Logo from '/images/FlexLogo.png'

import { GET_USER_WORKOUT_DATA } from '../utils/queries'

const ExerciseList = () => {
  const userId = Auth.getUserAccount().data._id
  const { loading, data: workoutData, error } = useQuery(GET_USER_WORKOUT_DATA, {
    variables: { userId: userId }
  })
  // return an array of workouts
  const workoutDataResults = workoutData?.getOneUserAccount.workouts || []
  return (
    <>
      <Exercises />
    </>
  )
}

export default ExerciseList