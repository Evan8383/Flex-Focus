import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { SIGNUP_USER } from '../utils/mutations'

import Auth from '../utils/auth'

// Icon components
import LockIcon from '../components/LockIcon'
import UserIcon from '../components/UserIcon'
import MailIcon from '../components/MailIcon'

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' })

  const [addUser, { error, data }] = useMutation(SIGNUP_USER)

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await addUser({ variables: { ...formState } })
      Auth.login(data.addUser.token)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {Auth.loggedIn() ? <Navigate to='/app/dashboard' /> :
        <div className='bg-zinc-900 w-full pt-40 h-screen'>
          <div className="flex flex-col items-center mr-2 ml-2">
            <h4 className='text-white text-center text-4xl font-semibold pb-2'>Create Your Account!</h4>
            <p className='text-white text-lg text-center w-full m-auto'>You're personal performance tracker is only a few clicks away!</p>

            <form className='text-white w-96 max-sm:w-3/4 flex flex-col text-center justify-center pb-8 pt-8' onSubmit={handleFormSubmit}>
              <div className=" flex flex-wrap justify-center w-full mb-4">
                <div className='flex w-full bg-gray-500 rounded'>
                  <UserIcon className='w-6 h-6 m-auto ml-1' />
                  <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none" placeholder='Username' type="text" name="username" id="username" onChange={handleFormChange} />
                </div>
              </div>

              <div className=" flex flex-wrap justify-center w-full mb-4">
                <div className='flex w-full bg-gray-500 rounded'>
                  <MailIcon className='w-6 h-6 m-auto ml-1' />
                  <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none" placeholder='Email' type="text" name="email" id="email" onChange={handleFormChange} />
                </div>
              </div>

              <div className=" flex flex-wrap justify-center w-full mb-4">
                <div className='flex w-full bg-gray-500 rounded'>
                  <LockIcon className='w-6 h-6 m-auto ml-1' />
                  <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none" placeholder='Password' type="text" name="password" id="password" onChange={handleFormChange} />
                </div>
              </div>

              {/* <div className=" flex flex-wrap justify-center w-full py-4">
              <div className='flex w-full bg-gray-500 rounded'>
                <LockIcon className='w-6 h-6 m-auto ml-1' />
                <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none"
                  placeholder='Confirm Password' type="text" name="Cpassword" id="Cpassword"/>
              </div>
            </div> */}
              <div className=" flex flex-wrap justify-center w-full mb-4">
                <button type="submit" className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Sign Up!</button>
              </div>
            </form>
            <div className='flex flex-wrap gap-1 justify-center'>
              <h5 className="w-full text-white text-center">Already have an account?</h5>
              <Link to="/login" className='w-fit text-blue-600 hover:underline font-bold'>Log in!</Link>
            </div>
          </div>
        </div>
      }
    </>
  )
}


export default Signup
