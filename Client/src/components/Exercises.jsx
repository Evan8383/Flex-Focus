import Auth from '../utils/auth'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

import Logo from '/images/FlexLogo.png'

import { GET_ALL_EXERCISES, GET_WORKOUTS } from '../utils/queries'
import { ASSIGN_EXERCISE } from '../utils/mutations'

import ExerciseFilter from './ExerciseFilter'

const Exercises = () => {

  const userId = Auth.getUserAccount().data._id

  // console.log(userId)
  const { loading: loadingExercises, data: exerciseData, error: exerciseError } = useQuery(GET_ALL_EXERCISES)
  const exerciseDataResults = exerciseData?.getAllExercises || []
  console.log(exerciseDataResults)

  const [muscleGroup, setMuscleGroup] = useState([])
  // console.log(muscleGroup)
  let results = exerciseDataResults.filter(exercise => muscleGroup.includes(exercise.muscleGroup))
  if (muscleGroup.includes('All')) {
    results = exerciseDataResults
  }
  // console.log(muscleGroup)
  // console.log(results)

  const { loading: loadingWorkouts, data: workoutData, error: workoutError } = useQuery(GET_WORKOUTS, {
    variables: { userId: userId },
    pollInterval: 100
  })
  const [showAssignModal, setShowAssignModal] = useState(false)

  const [selectedExercise, setSelectedExercise] = useState([])

  const handleOpenModal = (e) => {
    setShowAssignModal(true)
    localStorage.setItem('muscleGroup', JSON.stringify(muscleGroup))
    setMuscleGroup([])
    const selected = e.target.getAttribute('exerciseid')
    selectedExercise.push(selected)
  }
  const handleCloseModal = () => {
    setMuscleGroup(JSON.parse(localStorage.getItem('muscleGroup')))
    setShowAssignModal(false)
    setSelectedExercise([])
  }

  // console.log(selectedExercise)

  const workoutDataResults = workoutData?.getOneUserAccount.workouts || []

  const [assignWorkout, { assignError, assignData }] = useMutation(ASSIGN_EXERCISE)
  const handleAssignExercise = async (event) => {
    event.preventDefault()
    const workoutToAssignTo = event.target.getAttribute('workoutid')
    const exerciseToAssign = selectedExercise.toString()
    try {
      const { data } = await assignWorkout({ variables: { workoutId: workoutToAssignTo, exerciseId: exerciseToAssign } })
      // console.log(data)
    } catch (e) {
      console.error(e)
    }
    handleCloseModal()
  }
  // console.log(workoutDataResults)

  if (loadingExercises) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className='p-10 mb-40'>
        {showAssignModal ? (
          <>
            <div className="">
              <div className="relative top-0 w-full bg-zinc-900">
                {workoutDataResults.map((workout) => {
                  return (
                    <div key={workout._id} className='text-white bg-zinc-900 p-2 rounded cursor-pointer'>
                      <h1>{workout.workoutName}</h1>
                      <h2>Exercises assigned to Workout</h2>
                      {workout.assignedExercises ? workout.assignedExercises.map((exercise) => {
                        return (
                          <div key={exercise._id}>
                            <p>{exercise.name}</p>
                          </div>
                        )
                      }) : null}

                      <button onClick={handleAssignExercise} workoutId={workout._id} className='text-white bg-orange-500 rounded px-1 cursor-pointer'>Assign</button>
                    </div>
                  )
                })}
                <button onClick={handleCloseModal} className='text-white'>Close</button>
              </div>
            </div>
          </>
        ) : null}

        {!showAssignModal ? <ExerciseFilter setMuscleGroup={setMuscleGroup} muscleGroup={muscleGroup} />: null}
        {!results.length && !showAssignModal ? <div className='text-white m-auto w-fit mt-10'>Select a category to view exercises</div> : results.map((exercise) => {
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
                  <button onClick={handleOpenModal} exerciseid={exercise._id} className='text-white bg-orange-500 rounded px-1 cursor-pointer'>Assign</button>
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