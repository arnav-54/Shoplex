import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Wishlist from './pages/Wishlist'


import AdminLogin from './admin/components/Login'
import AdminPanel from './admin/components/AdminPanel'
import HomePage from './admin/components/HomePage'

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
export const currency = '₹'

const App = () => {
  const [adminToken, setAdminToken] = useState(() => {
    const t = localStorage.getItem('adminToken');
    return (t && t !== 'null' && t !== 'undefined') ? t : '';
  })
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    localStorage.setItem('adminToken', adminToken)
  }, [adminToken])

  if (isAdminRoute) {
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
          <Route path='/admin' element={
            adminToken ? <Navigate to='/admin/dashboard' /> : <AdminLogin setToken={setAdminToken} />
          } />
          <Route path='/admin/login' element={<AdminLogin setToken={setAdminToken} />} />
          <Route path='/admin/*' element={
            adminToken ? <AdminPanel token={adminToken} setToken={setAdminToken} /> : <Navigate to='/admin/login' />
          } />
        </Routes>
      </div>
    )
  }

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer autoClose={2000} limit={3} />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/wishlist' element={<Wishlist />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
