import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import App from './App.jsx'
import Index from './Index.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ExerciseList from './pages/ExerciseList.jsx'
import Exercise from './pages/Exercise.jsx'
import MyWorkouts from './pages/MyWorkouts.jsx'
import Workout from './pages/Workout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },

      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      }
      // {
      //   path: '/login',
      //   element: <Navigate to={'/app/login'}/>,
      // },
      // {
      //   path: '/signup',
      //   element: <Navigate to={'/app/signup'}/>,
      // }
    ],
  },{
    path: '/app',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to={'/app/dashboard'}/>,
      },
      {
        element: <Dashboard />,
        path: '/app/dashboard'
      },
      {
        path: '/app/exercises',
        element: <ExerciseList />,
      },
      {
        path: '/app/exercises/:id',
        element: <Exercise />,
      },
      {
        path: '/app/workouts',
        element: <MyWorkouts />,
      },
      {
        path: '/app/workouts/:id',
        element: <Workout />,
      },
      // {
      //   path: '/app/login',
      //   element: <Login />,
      // },
      // {
      //   path: '/app/signup',
      //   element: <Signup />,
      // },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
