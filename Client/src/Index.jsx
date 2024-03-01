import { Outlet } from 'react-router-dom';

function Index() {

  return (
      <main className="main">
      <Outlet />
      </main>
  )
}

export default Index