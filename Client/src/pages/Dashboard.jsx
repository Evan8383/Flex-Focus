import Nav from '../components/Nav'
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client'
import { GET_DASHBOARD } from '../utils/queries'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_NEW_NOTE, DELETE_NOTE } from '../utils/mutations'
import TrashIcon from '../components/TrashIcon'


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
      console.log(data)
      window.location.reload()
    } catch (e) {
      console.error(e)
    }
  }
  const userId = Auth.getUserAccount().data._id

  const { loading, data, error } = useQuery(GET_DASHBOARD, {
    variables: { userId: userId }
  })
  const dashboardData = data?.getOneUserAccount || []


  const [deleteNote, { deleteError, deleteData }] = useMutation(DELETE_NOTE)
  const handleDeleteNote = async (event, noteId) => {
    try {
      const noteId = event.target.getAttribute('note')
      const { data } = await deleteNote({ variables: { userId: userId, noteId: noteId } })
      window.location.reload()
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className='text-white bg-zinc-900 h-lvh'>
        <h1 className=''>Welcome {dashboardData.username}</h1>
        <h2>Workouts</h2>
        {dashboardData.workouts.length ? dashboardData.workouts.map((workout) => (
          <div key={workout._id}>
            <h3>{workout.workoutName}</h3>
            <p>{workout.workoutDescription}</p>
            <p>{workout.workoutNotes}</p>
          </div>
        )) : <p>No workouts to display</p>}
        <div className='flex justify-between'>
          <h3>Notes:</h3>
          <button onClick={() => setShowModal(true)} > Add a New Note </button>
        </div>
        {dashboardData.notes.length ? dashboardData.notes.map((note) => (
          <div className='flex justify-between bg-zinc-600 mb-2' key={note._id}>
            <div>
              <h3>{note.noteTitle}</h3>
              <p>{note.noteBody}</p>
            </div>
            <div className='my-auto p-1 mr-3'>
               <button onClick={handleDeleteNote} note={note._id}>X</button>
            </div>
          </div>
        )) : <p>No notes to display</p>}

        {showModal ? (
          <div className='bg-zinc-600 w-fit h-fit p-8 m-auto flex flex-wrap rounded-lg absolute top-40'>
            <div>
              <div>
                <form className='flex flex-wrap' onSubmit={handleFormSubmit}>
                  <div className='w-full'>
                    <label htmlFor="noteTitle" className='w-full'>Note Title:</label>
                    <input
                      className='w-full bg-zinc-600 border-b-2 border-white text-white p-2'
                      type="text"
                      name="noteTitle"
                      required
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className='w-full'>
                    <label htmlFor="noteBody">Note Body:</label>
                    <textarea
                      className='w-full bg-zinc-600 border-b-2 border-white text-white p-2'
                      name="noteBody"
                      required
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className='w-full flex justify-between'>
                    <button type='submit'> Save Changes </button>
                    <button onClick={() => setShowModal(false)}> Close </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}




export default Dashboard