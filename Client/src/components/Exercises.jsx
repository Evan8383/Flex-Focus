import Auth from '../utils/auth'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

import Logo from '/images/FlexLogo.png'

import { GET_ALL_EXERCISES } from '../utils/queries'

import ExerciseFilter from './ExerciseFilter'

const Exercises = () => {

  // console.log(workoutDataResults)
  const { loading: loadingExercises, data: exerciseData, error: exerciseError } = useQuery(GET_ALL_EXERCISES)
  const exerciseDataResults = exerciseData?.getAllExercises || []
  console.log(exerciseDataResults)

  const [muscleGroup, setMuscleGroup] = useState(['Chest'])
  // console.log(muscleGroup)
  let results = exerciseDataResults.filter(exercise => muscleGroup.includes(exercise.muscleGroup))
  if (muscleGroup.includes('All')) {
    results = exerciseDataResults
  }
  console.log(results)

  if (loadingExercises) {
    return <div>Loading...</div>
  }
  return (
    <>
    <ExerciseFilter setMuscleGroup={setMuscleGroup}/>
    <p>h1</p>
    
    
    </>
    )
}

export default Exercises