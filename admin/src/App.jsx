import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import AdminPanel from './components/AdminPanel'
import HomePage from './components/HomePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='min-h-screen'>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/admin/login' element={<Login setToken={setToken} />} />
        <Route path='/admin/*' element={
          token ? <AdminPanel token={token} setToken={setToken} /> : <Navigate to='/login' />
        } />
      </Routes>
    </div>
  )
}

export default App