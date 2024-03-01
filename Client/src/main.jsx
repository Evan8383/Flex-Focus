import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
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
    element: <App />,
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
      },
      {
        path: '/app/dashoard',
        element: <Dashboard />,
      },
      {
        path: '/app/exercise-list',
        element: <ExerciseList />,
      },
      {
        path: '/app/exercise/:id',
        element: <Exercise />,
      },
      {
        path: '/app/my-workouts',
        element: <MyWorkouts />,
      },
      {
        path: '/app/workout/:id',
        element: <Workout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
