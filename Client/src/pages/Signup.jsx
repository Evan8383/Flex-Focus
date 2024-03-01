import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { SIGNUP_USER } from '../utils/mutations'

import Auth from '../utils/auth'

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
    <div>
      <h4>Signup</h4>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" onChange={handleFormChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={handleFormChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={handleFormChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  )

}

export default Signup
