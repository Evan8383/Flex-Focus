import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../utils/auth'

const Nav = () => {

    const handleLogout = () => {
        Auth.logout()
    }

    return (
        <div className="fixed bottom-0 z-50 w-full h-16 bg-zinc-900">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <Link to='/app/dashboard' className="flex flex-col items-center justify-center px-5 hover:bg-zinc-600">
                    <button type="button" className="flex flex-col items-center justify-center px-5 hover:bg-zinc-600 group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="mt-1 text-gray-400 group-hover:text-white">Dashboard</span>
                    </button>
                </Link>
                <Link to='/app/exercises' className="flex flex-col items-center justify-center px-5 hover:bg-zinc-600">
                    <button type="button" className="flex flex-col items-center justify-center px-5 hover:bg-zinc-600 group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M467 176a29.94 29.94 0 0 0-25.32 12.5a2 2 0 0 1-3.64-1.14v-36.65c0-20.75-16.34-38.21-37.08-38.7A38 38 0 0 0 362 150v82a2 2 0 0 1-2 2H152a2 2 0 0 1-2-2v-81.29c0-20.75-16.34-38.21-37.08-38.7A38 38 0 0 0 74 150v37.38a2 2 0 0 1-3.64 1.14A29.94 29.94 0 0 0 45 176c-16.3.51-29 14.31-29 30.62v98.72c0 16.31 12.74 30.11 29 30.62a29.94 29.94 0 0 0 25.32-12.5a2 2 0 0 1 3.68 1.16v36.67C74 382 90.34 399.5 111.08 400A38 38 0 0 0 150 362v-82a2 2 0 0 1 2-2h208a2 2 0 0 1 2 2v81.29c0 20.75 16.34 38.21 37.08 38.7A38 38 0 0 0 438 362v-37.38a2 2 0 0 1 3.64-1.14A29.94 29.94 0 0 0 467 336c16.3-.51 29-14.31 29-30.62v-98.74c0-16.31-12.74-30.11-29-30.64"></path>
                        </svg>
                        <span className="mt-1 text-gray-400 group-hover:text-white">Exercises</span>
                    </button>
                </Link>
                <Link to='/app/workouts' className="flex flex-col items-center justify-center px-5 hover:bg-zinc-600">
                    <button type="button" className="flex flex-col items-center justify-center px-5 hover:bg-zinc-600 group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                            <path fill="currentColor" d="M120 56v48a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16m80-16h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16m-96 96H56a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16m96 0h-48a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16"></path>
                        </svg>
                        <span className="mt-1 text-gray-400 group-hover:text-white">Workouts</span>
                    </button>
                </Link>
                <button onClick={handleLogout} type="button" className="flex flex-col items-center justify-center px-5 hover:bg-zinc-600 group">
                    <svg className="w-5 h-5 text-red-400 transition duration-75 text-red-400 group-hover:text-red-500" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"></path>
                    </svg>
                    <span className="mt-1 text-red-400 group-hover:text-red-500">Logout</span>
                </button>
            </div>
        </div>

    )
}

export default Nav
