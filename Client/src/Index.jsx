import { Outlet } from 'react-router-dom';
import './index.css';

function Index() {

  return (
      <main className="main">
      <Outlet />
      </main>
  )
}

export default Index