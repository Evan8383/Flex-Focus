import { useParams } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Exercises from '../components/Exercises'
import { GET_ONE_WORKOUT, GET_ALL_EXERCISES } from '../utils/queries'
import { REMOVE_EXERCISE, ASSIGN_EXERCISE } from '../utils/mutations'

const Workout = () => {
  const { id } = useParams()
  const workoutId = id

  const { loading, data, error } = useQuery(GET_ONE_WORKOUT, {
    variables: { workoutId: workoutId },
    pollInterval: 100
  })

  const workout = data?.getOneWorkout || {}

  const [removeExercise] = useMutation(REMOVE_EXERCISE)

  const handleRemoveExercise = async (exerciseId) => {
    try {
      await removeExercise({
        variables: { workoutId: workoutId, exerciseId: exerciseId },
        refetchQueries: [{ query: GET_ONE_WORKOUT, variables: { workoutId: workoutId } }]
      })
    } catch (err) {
      console.error(err)
    }
  }

  const [addExerciseModel, setAddExerciseModel] = useState(false)

  const openModal = () => {
    setAddExerciseModel(true)
  }

  const closeModal = () => {
    setAddExerciseModel(false)
  }

  const { loading: loadingExercises, data: exerciseData, error: exerciseError } = useQuery(GET_ALL_EXERCISES)
  const exerciseDataResults = exerciseData?.getAllExercises || []

  const [assignExercise] = useMutation(ASSIGN_EXERCISE)

  const handleAddExercise = async (exerciseId) => {
    try {
      await assignExercise({
        variables: { workoutId: workoutId, exerciseId: exerciseId },
        refetchQueries: [{ query: GET_ONE_WORKOUT, variables: { workoutId: workoutId } }]
      })
    } catch (err) {
      console.error(err)
    }
    closeModal()
  }

  return (
    <div className="bg-zinc-900 w-full m-auto pt-16 h-full text-white flex flex-col items-center">
      <div className="flex items-center justify-center pb-8">
        <h1 className="text-2xl font-bold">{workout.workoutName}</h1>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        {workout.assignedExercises && workout.assignedExercises.length > 0 ? (
          workout.assignedExercises.map((exercise) => (
            <div key={`exercise_${workoutId}_${exercise._id}`} className="rounded-xl w-5/6 border bg-zinc-600 cursor-pointer mb-4">
              <div className="flex items-center justify-between p-4 max-md:flex-col">
                <h2 className="font-bold">{exercise.name}</h2>
                <p className="text-sm">{exercise.description}</p>
                <div className="max-md:pt-4">
                  <button onClick={() => handleRemoveExercise(exercise._id)} className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Remove</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No assigned exercises for this workout.</p>
        )}
      </div>
      <div className="flex justify-center mt-auto py-8">
        <button onClick={openModal} className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Add Exercise</button>
      </div>

      {addExerciseModel ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ">
          <div className=" bg-zinc-900 p-4 rounded-lg max-h-[450px] overflow-y-auto">
            <button onClick={closeModal} className="text-white text-2xl hover:text-gray-300">✕</button>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold pb-4">Add Exercise</h1>
              {exerciseDataResults.map((exercise) => (
                <div key={exercise._id} className="rounded-xl w-full p-4 border bg-zinc-600 cursor-pointer mb-4 flex items-center">
                  <h2 className="font-bold px-4 flex-1">{exercise.name}</h2>
                  <button onClick={() => handleAddExercise(exercise._id)} className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Add</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

    </div>
  )
}
export default Workout