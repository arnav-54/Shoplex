import React from 'react'
import {assets} from '../../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='glass-effect flex items-center justify-between py-4 px-6 mx-4 rounded-2xl shadow-sm border relative z-50 animate-fade-in-up'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white'>
            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/>
            </svg>
          </div>
          <div>
            <span className='playfair text-2xl font-bold text-amber-800'>Shoplex Admin</span>
            <p className='text-sm text-orange-600 hidden sm:block'>Manage your store</p>
          </div>
        </div>
        <button onClick={()=>setToken('')} className='btn-primary flex items-center gap-2'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
          </svg>
          <span>Logout</span>
        </button>
    </div>
  )
}

export default Navbar