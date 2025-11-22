import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-orange-50 to-amber-50'>
        <div className='modern-card max-w-md w-full mx-4 animate-fade-in-up'>
            <div className='text-center mb-8'>
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white'>
                        <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/>
                        </svg>
                    </div>
                    <h1 className='playfair text-3xl font-bold gradient-text'>Shoplex</h1>
                </div>

                <p className='text-gray-600'>Welcome back! Please sign in to continue.</p>
            </div>
            
            <form onSubmit={onSubmitHandler} className='space-y-6'>
                <div>
                    <div className='flex items-center gap-2 mb-3'>
                        <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
                        </svg>
                        <label className='font-semibold text-amber-800'>Email Address</label>
                    </div>
                    <input 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        className='w-full' 
                        type="email" 
                        placeholder='Enter your email' 
                        required 
                    />
                </div>
                
                <div>
                    <div className='flex items-center gap-2 mb-3'>
                        <svg className='w-5 h-5 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                        </svg>
                        <label className='font-semibold text-amber-800'>Password</label>
                    </div>
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        className='w-full' 
                        type="password" 
                        placeholder='Enter your password' 
                        required 
                    />
                </div>
                
                <button className='btn-primary w-full text-center py-4 text-lg font-semibold mt-8 flex items-center justify-center gap-2' type="submit">
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                    </svg>
                    Sign In to Dashboard
                </button>
            </form>
            
            <div className='mt-6 text-center'>
                <p className='text-sm text-gray-500'>Secure admin access only</p>
            </div>
        </div>
    </div>
  )
}

export default Login