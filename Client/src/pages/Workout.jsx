import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client'
import Exercises from '../components/Exercises'
import Auth from '../utils/auth'
import { GET_ONE_WORKOUT } from '../utils/queries'

const Workout = () => {
  const { id } = useParams()
  const workoutId = id

  const { loading, data, error } = useQuery(GET_ONE_WORKOUT, {
    variables: { workoutId: workoutId }
  })

  const workout = data?.getOneWorkout || {}


  return (
    <div className="bg-zinc-900 w-full m-auto pt-16 h-full text-white flex flex-col items-center">
      <div className="flex items-center justify-center pb-8">
        <h1 className="text-2xl font-bold">{workout.workoutName}</h1>
      </div>
      <div className="w-full h-full flex items-center justify-center">
      {workout.assignedExercises && workout.assignedExercises.length > 0 ? (
          workout.assignedExercises.map((exercise) => (
            <div key={`exercise_${workout.id}_${exercise.id}`} className="rounded-xl w-5/6 border bg-zinc-600 cursor-pointer mb-4">
              <div className="flex items-center justify-between p-4">
                <h2 className="font-bold">{exercise.name}</h2>
                <p className="text-sm">{exercise.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No assigned exercises for this workout.</p>
        )}
      </div>
      <div className="flex justify-center mt-auto py-8">
        <button className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Add Exercise</button>
      </div>
    </div>
  )
}
export default Workout