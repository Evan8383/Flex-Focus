import { useState, useEffect } from 'react'
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

  const [formError, setFormError] = useState(false)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await login({ variables: { ...formState } })
      console.log(data)
      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
      setFormError(true)
    }
  }

  useEffect(() => {
    setFormError(false)
  }, [formState])

  return (
    <>
      {Auth.loggedIn() ? <Navigate to='/app/dashboard' /> :
        <div className='bg-zinc-900 w-full pt-40 h-screen'>
          <div className="flex flex-col items-center mr-2 ml-2">
            <h4 className='text-white text-center text-4xl font-semibold pb-2'>Welcome Back!</h4>
            <p className='text-white text-lg text-center w-full m-auto'>You're personal performance tracker is only a few clicks away!</p>

            <form className='text-white w-96 max-sm:w-3/4 flex flex-col text-center justify-center pb-8 pt-8'  onSubmit={handleFormSubmit}>
              <div className=" flex flex-wrap justify-center w-full mb-4">
                <div className='flex w-full bg-gray-500 rounded'>
                  <MailIcon className='w-6 h-6 m-auto ml-1' />
                  <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none" placeholder='Email' type="text" name="email" id="email" onChange={handleFormChange} />
                </div>
              </div>

              <div className=" flex flex-wrap justify-center w-full mb-4">
                <div className='flex w-full bg-gray-500 rounded'>
                  <LockIcon className='w-6 h-6 m-auto ml-1' />
                  <input className="bg-gray-500 p-1 rounded placeholder:text-white w-full outline-none" placeholder='Password' type="password" name="password" id="password" onChange={handleFormChange} />
                </div>
              </div>
            {formError? <p className='text-red-500 text-center'>Invalid email or password</p> : null}

              <div className=" flex flex-wrap justify-center w-full mb-4">
                <button className="text-white p-2 pl-6 pr-6 bg-orange-500 rounded-lg outline outline-1 hover:text-gray-300">Login</button>
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