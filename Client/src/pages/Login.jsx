import { Navigate, Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div>Login</div>
      <Link to={'/signup'}><h2>Signup</h2></Link>
    </>
  )
}

export default Login