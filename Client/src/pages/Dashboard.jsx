import Auth from '../utils/auth'
import { useQuery } from '@apollo/client'
import { GET_DASHBOARD } from '../utils/queries'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_NEW_NOTE, DELETE_NOTE } from '../utils/mutations'
import { Link } from 'react-router-dom'
import Logo from '../../images/FlexLogo.png'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [addNewNote, { noteError, noteData }] = useMutation(ADD_NEW_NOTE)
  const [formState, setFormState] = useState({ noteTitle: '', noteBody: '' })

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await addNewNote({ variables: { ...formState, userId: Auth.getUserAccount().data._id } })
      setShowModal(false)
    } catch (e) {
      console.error(e)
    }
  }
  const userId = Auth.getUserAccount().data._id

  const { loading, data, error } = useQuery(GET_DASHBOARD, {
    variables: { userId: userId },
    pollInterval: 100
  })
  if (error) {
    window.location.assign('/login')
  }
  const dashboardData = data?.getOneUserAccount || []

  const [deleteNote, { deleteError, deleteData }] = useMutation(DELETE_NOTE)
  const handleDeleteNote = async (event, noteId) => {
    try {
      const noteId = event.target.getAttribute('note')
      const { data } = await deleteNote({ variables: { userId: userId, noteId: noteId } })
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className={!showModal ? 'bg-zinc-900 w-full m-auto p-8 min-h-screen mb-40' : 'pointer-events-none bg-zinc-900 w-full m-auto p-10 h-screen mb-40'}>
        <div className="flex items-center justify-center mb-6">
          <img src={Logo} alt="FlexLogo" className='object-scale-down h-16' />
        </div>
        <div className='flex flex-wrap justify-center items-center mb-6'>
          <h4 className='text-orange-500 text-3xl font-semibold px-1 relative pb-2'>
            {dashboardData.username}'s
            <span className='absolute bottom-0 left-0 w-full h-0.5 bg-white'></span>
          </h4>
          <h4 className='text-white text-3xl font-semibold px-1 relative pb-2'>
            Dashboard
            <span className='absolute bottom-0 left-0 w-full h-0.5 bg-white'></span>
          </h4>
        </div>

        <div className='flex flex-col justify-center items-center mb-4'>
          <Link to={'/app/workouts'}>
            <h2 className="text-white text-center text-xl font-medium mb-2 hover:shadow transition-all hover:translate-x-4 hover:text-orange-500 w-fit">My Workouts</h2>
          </Link>
          {dashboardData.workouts.length ? dashboardData.workouts.map((workout) => (

            // *Copy this styling
            <Link key={workout._id} to={`/app/workouts/${workout._id}`} className='w-5/6'>
              <div className='text-white mb-2 overflow-hidden text-ellipsis'>
                <div className='bg-zinc-600 p-2 rounded-md cursor-pointer flex flex-col items-center justify-center text-white hover:bg-gray-400 transition-colors'>
                  <div className="flex flex-col justify-center items-center border-b-2 w-full">
                    <h3 className='text-xl font-medium'>{workout.workoutName}</h3>
                    <p className='mb-2'>{workout.workoutCategory ? workout.workoutCategory : "Uncategorized"}</p>
                  </div>
                  <p className='mt-2'>{workout.workoutDescription ? workout.workoutDescription : "No description"}</p>
                </div>
              </div>
            </Link>

          )) : <Link to={'/app/workouts'} className='w-5/6'>
            <div className='bg-zinc-600 rounded-md mb-4 cursor-pointer flex flex-wrap items-center justify-center text-white hover:bg-gray-400 transition-colors'>
              <p className='flex flex-wrap justify-center w-full text-center text-xl p-2 overflow-auto' >No workouts to display</p>
              <p className="text-center p-2 hover:underline overflow-auto">Click to add a workout</p>
            </div>
          </Link>}
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='flex flex-wrap text-center text-white text-xl font-medium mb-2'>Notes to self</h3>
          <div className='flex mt-auto pb-8'>
          <button onClick={() => setShowModal(true)} className='text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300'>Add Note</button>
          </div>
        </div>
        {dashboardData.notes.length ? dashboardData.notes.map((note) => (
          <div className='flex flex-col flex-wrap justify-center items-center mb-4 ' key={note._id}>
            <div className='bg-zinc-600 p-2 rounded text-white w-5/6 overflow-hidden'>
              <div className="flex justify-between border-b-2 mb-2">
                <h3 className='text-xl font-medium mb-2 '>{note.noteTitle}</h3>
                <button onClick={handleDeleteNote} note={note._id} className='text-white bg-orange-500 text-center mb-2 px-1 rounded outline outline-1 hover:bg-orange-600 transition-all'>Delete</button>
              </div>
              <p className='text-white '>{note.noteBody}</p>
            </div>
          </div>
        )) : <p className='text-white text-center'>No notes to display</p>}
      </div>

      {showModal ? (
        <div className='bg-zinc-900 w-full h-full p-8 m-auto flex flex-wrap absolute top-0 left-0 right-0'>
          <div>
            <div>
              <form className='flex flex-wrap' onSubmit={handleFormSubmit}>
                <div className='w-full mb-4'>
                  <label htmlFor="noteTitle" className='text-white text-xl mb-4 '>Note Title:</label>
                  <input
                    className='w-full bg-gray-500 border-b-2 border-white text-white p-2 rounded outline-none mt-4'
                    type="text"
                    name="noteTitle"
                    required
                    onChange={handleFormChange}
                  />
                </div>
                <div className='w-full mb-4'>
                  <label htmlFor="noteBody" className='text-white text-xl'>Note Body:</label>
                  <textarea
                    className='w-full bg-gray-500 border-b-2 border-white text-white p-2 rounded outline-none mt-4'
                    name="noteBody"
                    required
                    onChange={handleFormChange}
                  />
                </div>
                <div className='w-full flex justify-between'>
                  <button type='submit' className='text-white bg-gray-500 px-2 py-1 rounded'>Add Note</button>
                  <button onClick={() => setShowModal(false)} className='text-white bg-gray-500 px-2 py-1 rounded'>Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}




export default Dashboard