import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'

import Auth from '../utils/auth'

import LockIcon from '../components/LockIcon'
import UserIcon from '../components/UserIcon'
import MailIcon from '../components/MailIcon'

const Login = () => {

  const [formState, setFormState] = useState({ email: '', password: '' })
  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormState({ ...formState, [name]: value })
  }

  const [login, { error, data }] = useMutation(LOGIN_USER)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await login({ variables: { ...formState } })
      console.log(data)
      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      {Auth.loggedIn() ? <Navigate to='/app/dashboard' /> :
        <div className='bg-black w-full m-auto p-10 h-lvh'>
          <div className="max-w-fit m-auto h-full">
            <h4 className='text-white text-center text-2xl font-semibold'>Welcome Back!</h4>
            <p className='text-white text-sm text-center w-56 m-auto'>You're personal performance tracker is only a few clicks away!</p>

            <form className='text-white flex flex-wrap text-center justify-center mb-4'  onSubmit={handleFormSubmit}>
              <div className=" flex flex-wrap justify-center w-full py-4">
                <div className='flex w-full bg-gray-500 rounded'>
                  <MailIcon className='w-6 h-6 m-auto ml-1' />
                  <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none" placeholder='Email' type="text" name="email" id="email" onChange={handleFormChange} />
                </div>
              </div>

              <div className=" flex flex-wrap justify-center w-full py-4">
                <div className='flex w-full bg-gray-500 rounded'>
                  <LockIcon className='w-6 h-6 m-auto ml-1' />
                  <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none" placeholder='Password' type="password" name="password" id="password" onChange={handleFormChange} />
                </div>
              </div>

              <div className=" flex flex-wrap justify-center w-full py-4">
                <button className="w-fit py-1 px-4 rounded bg-orange-500 align-center font-bold">Login</button>
              </div>
            </form>

            <div className='text-white text-center'>
              <p>Don't have an account?</p>
              <Link to='/signup' className='text-blue-500'>Sign Up</Link>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Login