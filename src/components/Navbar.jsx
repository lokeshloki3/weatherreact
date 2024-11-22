import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <ul className='w-full md:w-3/4 mx-auto flex justify-between bg-blue-200 p-6 m-6 rounded-lg'>
            <NavLink to="/">
                <li className="text-lg font-semibold">Search Weather</li>
            </NavLink>
            <NavLink to="/bookmarks">
                <li className="text-lg font-semibold">Bookmarks</li>
            </NavLink>
        </ul>
    </div>
  )
}

export default Navbar