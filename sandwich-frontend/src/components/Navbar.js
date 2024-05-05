import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-100 text-3xl font-semi py-8 px-4 h-26">
    <ul className="flex justify-between">
      <li className=''>
        <Link to="/" className=''>Sandwich-Shop</Link>
      </li>
      <li>
        <ul className="flex space-x-4">
          <li>
            <Link to="/order">Order</Link>
          </li>
          <li>
            <Link to="/status">Status</Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  )
}
