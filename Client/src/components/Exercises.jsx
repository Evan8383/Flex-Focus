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

  const [muscleGroup, setMuscleGroup] = useState(['All'])
  // console.log(muscleGroup)
  let results = exerciseDataResults.filter(exercise => muscleGroup.includes(exercise.muscleGroup))
  if (muscleGroup.includes('All')) {
    results = exerciseDataResults
  }
  console.log(muscleGroup)
  console.log(results)

  if (loadingExercises) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className='p-10'>
        <ExerciseFilter setMuscleGroup={setMuscleGroup} muscleGroup={muscleGroup} />
        {!results.length ? <div className='text-white'> select a category</div> : results.map((exercise) => {
          return (
            <>
              <Link to={`/app/exercises/${exercise._id}`}>
                <div key={exercise._id} className='text-white p-2 bg-zinc-600 mb-2 rounded'>
                  <h1>{exercise.name}</h1>
                  <h2>{exercise.muscleGroup}</h2>
                  <p className='truncate'>{exercise.description}</p>
                </div>
              </Link>
            </>
          )
        })}
      </div>
    </>
  )
}

export default Exercises