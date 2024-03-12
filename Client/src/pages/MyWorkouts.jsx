import Auth from '../utils/auth'
import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Link, useParams } from 'react-router-dom'

import { GET_WORKOUTS } from '../utils/queries'
import { DELETE_WORKOUT, ADD_WORKOUT } from '../utils/mutations'
import Logo from '/images/FlexLogo.png'

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

  const [formError, setFormError] = useState()

  useEffect(() => {
    setFormError(false)
  }, [formState])

  const [addWorkout, { addError, addData }] = useMutation(ADD_WORKOUT)
  const handleAddWorkout = async (event) => {
    event.preventDefault()
    try {
      const { data } = await addWorkout({ variables: { ...formState, userId: Auth.getUserAccount().data._id } })
      setShowWorkoutModal(false)
      setFormState({ workoutName: '', workoutCategory: '', workoutDescription: '' })
    } catch (e) {
      setFormError(true)
      console.error('Form error')
    }
  }


  if (loading) return <div className='bg-zinc-900 text-white'>Loading...</div>
  return (
    <>
      <div className="flex flex-col items-center w-full bg-zinc-900 text-white p-8 min-h-screen mb-24">
        <div className="flex flex-col justify-center items-center max-w-2xl mb-2">

          <img className='object-scale-down h-16  mb-6' src={Logo} alt="" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl relative py-2">Your Workouts
            <span className='absolute bottom-0 left-0 w-full h-0.5 bg-white'></span>
          </h1>
          <button onClick={() => setShowWorkoutModal(true)} className="text-white my-4 p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">
            Add Workout
          </button>
        </div>
        {loading ? <div>Loading...</div> : null}
        {workoutData.workouts.length ? workoutData.workouts.map((workout) => (
          <div key={workout._id} className="mb-4 w-5/6 relative">
            <Link to={`/app/workouts/${workout._id}`} className=''>
              <div className='bg-zinc-600 p-2 rounded-md cursor-pointer text-white hover:bg-gray-400 transition-colors'>
                <div className="flex justify-between items-center border-b-2 mb-2">
                  <div>
                    <h2 className="text-xl font-medium mb-2">{workout.workoutName}</h2>
                    <p className="mb-2">{workout.workoutCategory ? workout.workoutCategory : 'Uncategorized'}</p>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-sm text-white">
                    {workout.workoutDescription ? workout.workoutDescription : "No description available"}
                  </p>
                </div>
              </div>
            </Link>
            <button onClick={handleDeleteWorkout} workoutid={workout._id} className='text-white absolute top-2 right-2 px-2 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300'>Delete</button>
          </div>

        )) : <div className="mx-auto flex min-h-[400px] items-center justify-center p-4">No workouts to display</div>}
      </div>
      {/* Modal/form */}
      {showWorkoutModal ? (
        <div className='w-full min-h-screen absolute top-0 bg-zinc-900 text-white p-10'>
          <div>
            <div className='bg-orange-500 bg-zinc-500 p-2 rounded'>
              <h2 className='text-2xl font-bold mb-2'>New Workout:</h2>
              <form onSubmit={handleAddWorkout} >
                <div className='bg-zinc-600 flex flex-wrap w-full p-3 rounded mb-4'>
                  <label className="text-white text-lg">Workout Name</label>

                  <input
                    className={!formError ? "form-input w-full outline-none background-transparent bg-zinc-900 text-white h-10 rounded-md mb-4 p-2" : "placeholder:text-red-500 form-input w-full outline-none background-transparent bg-zinc-900 text-white h-10 rounded-md mb-4 p-2 border-2 border-red-500"}
                    name="workoutName"
                    type="list"
                    placeholder={formError ? "Required" : null}
                    options="Strength,Hypertrophy,Endurance"
                    value={formState.workoutName}
                    onChange={handleFormChange}
                  ></input>
                  <label className="text-white text-lg">Workout Category</label>
                  <select
                    className="form-input w-full outline-none background-transparent bg-zinc-900 text-white h-10 rounded-md mb-4 p-2"
                    name="workoutCategory"
                    value={formState.workoutCategory}
                    onChange={handleFormChange}
                  >
                    <option></option>
                    <option value="Strength">Strength</option>
                    <option value="Hypertrophy">Hypertrophy</option>
                    <option value="Endurance">Endurance</option>
                  </select>
                  <label className="text-white text-lg">Workout Description</label>
                  <textarea
                    className="form-input w-full outline-none background-transparent h-24 bg-zinc-900 text-white rounded-md resize-y p-2"
                    name="workoutDescription"
                    type="text"
                    value={formState.workoutDescription}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <div className='flex justify-between'>
                  <div >
                    <button className='bg-blue-500 mr-auto px-4 py-1 rounded' type="submit">Submit</button>
                  </div>
                  <div >
                    <button className='bg-orange-500 px-4 py-1 rounded' type='button' onClick={() => setShowWorkoutModal(false)}>Close</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

