import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from '../pages/Add'
import List from '../pages/List'
import Orders from '../pages/Orders'

const AdminPanel = ({ token, setToken }) => {
  return (
    <>
      <Navbar setToken={setToken} />
      <div className='flex w-full'>
        <Sidebar />
        <div className='flex-1 min-h-screen bg-gradient-to-br from-orange-50/30 to-amber-50/30'>
          <Routes>
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/list' element={<List token={token} />} />
            <Route path='/orders' element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default AdminPanel