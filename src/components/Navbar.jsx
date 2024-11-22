import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <ul className='flex justify-between bg-slate-400 p-6 m-6 rounded-lg'>
            <NavLink to="/weather">
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