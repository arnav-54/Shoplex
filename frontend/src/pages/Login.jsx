import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      
      console.log('Form submitted:', { currentState, name, email, password: '***' });
      console.log('Backend URL:', backendUrl);
      
      try {
        if (currentState === 'Sign Up') {
          console.log('Attempting registration...');
          const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
          console.log('Registration response:', response.data);
          
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            toast.success('Account created successfully!')
          } else {
            toast.error(response.data.message)
          }

        } else {
          console.log('Attempting login...');
          const response = await axios.post(backendUrl + '/api/user/login', {email, password})
          console.log('Login response:', response.data);
          
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            toast.success('Welcome back to Shoplex!')
          } else {
            toast.error(response.data.message)
          }
        }

      } catch (error) {
        console.error('Network error:', error);
        if (error.code === 'ERR_NETWORK') {
          toast.error('Cannot connect to server. Please check if backend is running on port 4000.')
        } else if (error.response) {
          toast.error(error.response.data.message || 'Server error occurred')
        } else {
          toast.error('Network error: ' + error.message)
        }
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-orange-50 to-amber-50'>
      <div className='modern-card w-full max-w-md p-8'>
        <form onSubmit={onSubmitHandler} className='space-y-6'>
          <div className='text-center'>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/>
                </svg>
              </div>
              <h2 className='playfair text-3xl text-amber-800'>{currentState}</h2>
            </div>
            <p className='text-amber-700'>
              {currentState === 'Login' ? 'Welcome back to Shoplex!' : 'Join Shoplex today!'}
            </p>
          </div>

          <div className='space-y-4'>
            {currentState === 'Sign Up' && (
              <div>
                <label className='block text-sm font-semibold text-amber-800 mb-2'>Full Name</label>
                <input 
                  onChange={(e)=>setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  className='w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors bg-orange-50/50' 
                  placeholder='Enter your name' 
                  required
                />
              </div>
            )}
            
            <div>
              <label className='block text-sm font-semibold text-amber-800 mb-2'>Email Address</label>
              <input 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} 
                type="email" 
                className='w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors bg-orange-50/50' 
                placeholder='Enter your email' 
                required
              />
            </div>
            
            <div>
              <label className='block text-sm font-semibold text-amber-800 mb-2'>Password</label>
              <input 
                onChange={(e)=>setPasword(e.target.value)} 
                value={password} 
                type="password" 
                className='w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors bg-orange-50/50' 
                placeholder='Enter your password' 
                required
              />
            </div>
          </div>

          <div className='flex justify-between items-center text-sm'>
            <button type='button' className='text-orange-600 hover:text-orange-800 font-medium transition-colors'>
              Forgot password?
            </button>
            <button 
              type='button'
              onClick={()=>setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')} 
              className='text-orange-600 hover:text-orange-800 font-medium transition-colors'
            >
              {currentState === 'Login' ? 'Create account' : 'Login here'}
            </button>
          </div>

          <button 
            type='submit'
            className='w-full btn-primary text-center py-3 text-lg font-bold'
          >
            {currentState === 'Login' ? 'Welcome Back!' : 'Join Shoplex!'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
