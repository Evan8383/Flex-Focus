import Nav from '../components/Nav'
import Auth from '../utils/auth'
import { useQuery } from '@apollo/client'
import { GET_DASHBOARD } from '../utils/queries'
import { useState } from 'react'


const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const userId = Auth.getUserAccount().data._id
  const { loading, data, error } = useQuery(GET_DASHBOARD, {
    variables: { userId: userId }
  })

  const dashboardData = data?.getOneUserAccount || []

  if (loading) {
    return <div>Loading...</div>
  }
  console.log(dashboardData)
  return (
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
      <h3>Notes</h3>
      {dashboardData.notes.length ? dashboardData.notes.map((note) => (
        <div key={note._id}>
          <h3>{note.noteTitle}</h3>
          <p>{note.noteBody}</p>
        </div>
      )) : <p>No notes to display</p>}
      <div className='flex justify-between'>
        <button onClick={() => setShowModal(true)} > Add a New Note </button>
      </div>

      {showModal ? (
        <div className='bg-zinc-600 w-fit h-fit p-10  m-auto flex flex-wrap'>
          <div>
            <div>
              <form className='flex flex-wrap'>
                <div className='w-full'>
                  <label htmlFor="noteTitle" className='w-full'>Note Title:</label>
                  <input
                    className='w-full bg-zinc-600 border-b-2 border-white text-white p-2'
                    type="text"
                    name="noteTitle"
                    required
                  />
                </div>
                <div className='w-full'>
                  <label htmlFor="noteBody">Note Body:</label>
                  <textarea
                    className='w-full bg-zinc-600 border-b-2 border-white text-white p-2'
                    name="noteBody"
                    required
                  />
                </div>
                <div className='w-full flex justify-between'>
                  <button onClick={() => setShowModal(false)}> Save Changes </button>
                  <button onClick={() => setShowModal(false)}> Close </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}




export default Dashboard