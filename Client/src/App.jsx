import { Outlet } from 'react-router-dom'
import './index.css'

function App() {

  return (
    <>
      <main className="main">
      <Outlet />
      </main>
    </>
  )
}

export default App
