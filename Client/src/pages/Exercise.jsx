import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client'
import { GET_ONE_EXERCISE } from '../utils/queries'

const Exercise = () => {
  const { id } = useParams()
  const exerciseId = id

  const { loading, data, error } = useQuery(GET_ONE_EXERCISE, {
    variables: { id: exerciseId }
  })

  const exercise = data?.getOneExercise || {}

  console.log(exercise)

  return (
    <div className="bg-zinc-900 w-full m-auto pt-16 h-full text-white flex flex-col items-center">
      <div className="flex items-center justify-center pb-8">
        <h1 className="text-2xl font-bold text-center underline underline-offset-8 decoration-orange-500 decoration-4">{exercise.name}</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pb-4 text-center">
        <p className="font-bold">Muscle Group:</p>
        <p>{exercise.muscleGroup}</p>
        </div>
        <p className="font-bold">Description:</p>
        <p className="text-center">{exercise.description}</p>
      </div>
    </div>
  )
}

export default Exercise