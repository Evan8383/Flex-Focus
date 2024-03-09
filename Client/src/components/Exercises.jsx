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
        {!results.length ? <div className='text-white m-auto w-fit mt-10'>Select a category to view exercises</div> : results.map((exercise) => {
          return (
            <>
              <div>
                <Link to={`/app/exercises/${exercise._id}`}>
                  <div key={exercise._id} className='text-white p-2 bg-zinc-600 rounded'>
                    <div className='flex justify-between border-b-2 mb-2'>
                      <h1>{exercise.name}</h1>
                      <h2>{exercise.muscleGroup}</h2>
                    </div>
                    <p className='truncate'>{exercise.description}</p>
                  </div>
                </Link>
                <div className='w-fit mb-2 mt-1'>
                  <button className='text-white bg-orange-500 rounded px-1 cursor-pointer'>Assign</button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default Exercises