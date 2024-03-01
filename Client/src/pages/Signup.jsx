import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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
      <div className='bg-black w-fit m-auto p-10 h-lvh'>

        <h4 className='text-white text-center text-2xl'>Signup</h4>

        <form className='text-white flex flex-wrap text-center justify-center mb-4' onSubmit={handleFormSubmit}>
          <div className=" flex flex-wrap justify-center w-full py-4">
            <div className='flex w-full bg-gray-500 rounded'>
              <UserIcon className='w-6 h-6 m-auto ml-1' />
              <input className="bg-gray-500 p-1 rounded border-1 border-white placeholder:text-white w-full outline-none" placeholder='Username' type="text" name="username" id="username" onChange={handleFormChange} />
            </div>
          </div>

          <div className=" flex flex-wrap justify-center w-full py-4">
            <div className='flex w-full bg-gray-500 rounded'>
              <MailIcon className='w-6 h-6 m-auto ml-1' />
              <input className="bg-gray-500 p-1 rounded border-1 border-white placeholder:text-white w-full outline-none" placeholder='Email' type="text" name="email" id="email" onChange={handleFormChange} />
            </div>
          </div>

          <div className=" flex flex-wrap justify-center w-full py-4">
            <div className='flex w-full bg-gray-500 rounded'>
              <LockIcon className='w-6 h-6 m-auto ml-1' />
              <input className="bg-gray-500 p-1 rounded border-1 border-white placeholder:text-white w-full outline-none" placeholder='Password' type="text" name="password" id="password" onChange={handleFormChange} />
            </div>
          </div>
          <button type="submit" className="w-fit py-1 px-4 rounded bg-orange-500 align-center">Sign Up!</button>
        </form>
        <div className='flex flex-wrap gap-1 justify-center'>
          <h5 className="w-full text-white text-center">Already have an account?</h5>
          <Link to="/login" className='w-fit text-blue-600 hover:underline font-bold'>Log in!</Link>
        </div>
      </div>
    </>
  )
}

export default Signup
