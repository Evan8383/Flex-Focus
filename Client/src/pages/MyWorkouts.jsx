import Auth from '../utils/auth'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

import { GET_WORKOUTS } from '../utils/queries'

export default function MyWorkouts() {
  const userId = Auth.getUserAccount().data._id
  const { loading, data, error } = useQuery(GET_WORKOUTS, {
    variables: { userId: userId },
    pollInterval: 100
  })
  const workoutData = data?.getOneUserAccount || []

  let { workoutId } = useParams()

  return (
    <>
      <div className="w-full gap-4 lg:gap-8 bg-zinc-900 h-screen text-white z-20">
        <div className="mx-auto flex justify-between max-w-2xl">
          <div className="space-y-2 m-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Workouts</h1>
            <button className="w-full h-12 b text-white bg-orange-500 rounded-md shadow-md transition-colors">
              Add Workout
            </button>
          </div>
          <img className='w-24 h-24 my-auto mr-4' src="../images/FlexLogo.png" alt="" />
        </div>
        {loading ? <div>Loading...</div> : null}


        {workoutData.workouts.length ? workoutData.workouts.map((workout) => (
          <div key={workout._id} className="z-50 mx-auto grid max-w-2xl gap-4 px-4 cursor-pointer min-w-full mb-4 z-10">
            <Link to={`/app/workouts/${workout._id}`}>
              <div className="rounded-xl border overflow-hidden divide-y bg-zinc-600">
                <div className="flex items-center p-4">
                  <h2 className="font-bold">{workout.workoutName}</h2>
                  <p className="ml-auto text-sm white">{workout.workoutCategory ? workout.workoutCategory : 'Uncategorized'}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-white ">
                    {workout.workoutDescription ? workout.workoutDescription : "No description available"}
                  </p>
                </div>
              </div>
            </Link>
            <div className='flex justify-around'>
              <button className='py-2 px-5 bg-zinc-600 rounded'>Details</button>
              <button className='py-2 px-5 bg-orange-500 rounded'>Delete</button>
            </div>
          </div>
        )) : <div className="mx-auto flex min-h-[400px] items-center justify-center p-4">No workouts to display</div>}
      </div >
    </>
  )
}

