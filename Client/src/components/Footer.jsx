import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-wrap justify-between max-sm:items-center max-sm:flex-col bg-zinc-600 w-full h-12 '>
      <ul className='flex flex-row text-white items-center'>
        <li className='underline underline-offset-4 pr-2 pl-8 max-sm:pl-0'>
          <Link to='/'>Home</Link>
        </li>
        <li className='underline underline-offset-4 px-2'>
          <Link to='/about'>About</Link>
        </li>
        <li className='underline underline-offset-4 px-2'>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>
      <p className='flex flex-row text-white items-center pl-2 pr-8 max-sm:px-0'>
        FlexFocus &copy; 2024
      </p>
    </div>
  )
}

export default Footer
