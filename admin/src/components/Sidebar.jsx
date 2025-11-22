import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-gradient-to-b from-orange-50/30 to-amber-50/30 border-r border-orange-200/50 backdrop-blur-sm'>
        <div className='flex flex-col gap-3 pt-8 pl-[15%] text-[15px]'>
            <div className='mb-6 animate-fade-in-up'>
              <h2 className='text-lg font-bold gradient-text mb-2 flex items-center gap-2'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'/>
                </svg>
                Dashboard
              </h2>
              <p className='text-sm text-orange-600'>Manage your store</p>
            </div>

            <NavLink className='flex items-center gap-3 border border-orange-200/50 border-r-0 px-4 py-3 rounded-l-2xl hover:bg-white/70 hover:border-orange-300 transition-all font-medium text-amber-800 hover:text-orange-600 animate-slide-in-right' to="/add">
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                </svg>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-orange-200/50 border-r-0 px-4 py-3 rounded-l-2xl hover:bg-white/70 hover:border-orange-300 transition-all font-medium text-amber-800 hover:text-orange-600 animate-slide-in-right' to="/list">
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-orange-200/50 border-r-0 px-4 py-3 rounded-l-2xl hover:bg-white/70 hover:border-orange-300 transition-all font-medium text-amber-800 hover:text-orange-600 animate-slide-in-right' to="/orders">
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                </svg>
                <p className='hidden md:block'>Orders</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar