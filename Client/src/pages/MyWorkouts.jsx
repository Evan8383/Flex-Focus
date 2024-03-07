import Auth from '../utils/auth'
import { disableExperimentalFragmentVariables, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

import { GET_WORKOUTS } from '../utils/queries'
import { DELETE_WORKOUT, ADD_WORKOUT } from '../utils/mutations'

export default function MyWorkouts() {
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  useEffect(() => {
    setFormState({ workoutName: '', workoutCategory: '', workoutDescription: '' })
  }, [showWorkoutModal])

  const [formState, setFormState] = useState({ workoutName: '', workoutCategory: '', workoutDescription: '' })
  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }


  const userId = Auth.getUserAccount().data._id
  const { loading, data, error } = useQuery(GET_WORKOUTS, {
    variables: { userId: userId },
    pollInterval: 100
  })
  const workoutData = data?.getOneUserAccount || []

  const [deleteWorkout, { deleteError, deleteData }] = useMutation(DELETE_WORKOUT)
  const handleDeleteWorkout = async (event) => {
    try {
      const workoutId = event.target.getAttribute('workoutid')
      const { data } = await deleteWorkout({ variables: { userId: userId, workoutId: workoutId } })
    } catch (e) {
      console.error(e)
    }
  }

  const [addWorkout, { addError, addData }] = useMutation(ADD_WORKOUT)
  const handleAddWorkout = async (event) => {
    event.preventDefault()
    try {
      const { data } = await addWorkout({ variables: { ...formState, userId: Auth.getUserAccount().data._id } })
      setShowWorkoutModal(false)
      setFormState({ workoutName: '', workoutCategory: '', workoutDescription: '' })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="w-full gap-4 lg:gap-8 bg-zinc-900 text-white z-20 overflow-scroll">
        <div className="mx-auto flex justify-between max-w-2xl">
          <div className="space-y-2 m-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Workouts</h1>
            <button onClick={() => setShowWorkoutModal(true)} className="w-full h-12 b text-white bg-orange-500 rounded-md shadow-md transition-colors">
              Add Workout
            </button>
          </div>
          <img className='w-24 h-24 my-auto mr-4' src="../images/FlexLogo.png" alt="" />
        </div>
        {loading ? <div>Loading...</div> : null}

        {workoutData.workouts.length ? workoutData.workouts.map((workout) => (
          <div key={workout._id} className="z-50 mx-auto grid max-w-2xl gap-4 px-4  min-w-full mb-4 z-10">
            <Link to={`/app/workouts/${workout._id}`}>
              <div className="rounded-xl border overflow-hidden divide-y bg-zinc-600 cursor-pointer">
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
            <div className='flex justify-start'>
              <button onClick={handleDeleteWorkout} workoutid={workout._id} className='py-2 px-5 bg-orange-500 rounded'>Delete</button>
            </div>
          </div>
        )) : <div className="mx-auto flex min-h-[400px] items-center justify-center p-4">No workouts to display</div>}
      </div >

      {showWorkoutModal ? (
        <div className={'w-full h-screen bg-white absolute top-0 '}>
          <form onSubmit={handleAddWorkout} className={'bg-white'}>
            <input
              className="form-input"
              placeholder="Workout Name"
              name="workoutName"
              type="list"
              options="Strength,Hypertrophy,Endurance"
              value={formState.workoutName}
              onChange={handleFormChange}
            ></input>
            <select
              className="form-input"
              placeholder="Workout Category"
              name="workoutCategory"
              value={formState.workoutCategory}
              onChange={handleFormChange}
            >
              <option>Select a Category</option>
              <option value="Strength">Strength</option>
              <option value="Hypertrophy">Hypertrophy</option>
              <option value="Endurance">Endurance</option>
            </select>
            <input
              className="form-input"
              placeholder="Workout Description"
              name="workoutDescription"
              type="text"
              value={formState.workoutDescription}
              onChange={handleFormChange}
            ></input>
            <button type="submit">Submit</button>
            <button onClick={() => setShowWorkoutModal(false)}>Close</button>
          </form>
        </div>
      ) : null}
    </>
  )
}

