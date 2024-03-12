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
      <div className="flex flex-col justify-center items-center text-white pt-8">
        <img className='object-scale-down h-16 mb-6' src={Logo} alt="" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl relative py-2">Exercises
          <span className='absolute bottom-0 left-0 w-full h-0.5 bg-white'></span>
        </h1>
      </div>
      <Exercises />
    </>
  )
}

export default ExerciseList