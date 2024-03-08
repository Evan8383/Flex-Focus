import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client'
// import { GET_ONE_WORKOUT } from '../utils/queries'

const Workout = () => {
  // const { id } = useParams()

  // const { loading, workoutData, error } = useQuery(GET_ONE_WORKOUT, {
  //   variables: { workoutId: { id} },
  //   pollInterval: 100
  // })

  // const workout = workoutData?.getOneWorkout || []

  return (
    <div className="bg-zinc-900 w-full m-auto pt-16 h-full text-white flex flex-col items-center">
      <div className="flex items-center justify-center pb-8">
        <h1 className="text-2xl font-bold">Workout</h1>
      </div>
      <div className="w-full h-full flex items-center justify-center">
          <div className="rounded-xl w-5/6 border bg-zinc-600 cursor-pointer">
            <div className="flex items-center justify-between p-4">
              <h2 className="font-bold">Exercise name</h2>
              <p className="text-sm">Exercise description</p>
            </div>
          </div>
      </div>
    </div>
  )
}
export default Workout