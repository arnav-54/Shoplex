import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPasword] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log('Form submitted:', { currentState, name, email, password: '***' });
    console.log('Backend URL:', backendUrl);

    try {
      if (currentState === 'Sign Up') {
        console.log('Attempting registration...');
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
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
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
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
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50'>
      <div className='modern-card w-full max-w-md animate-fade-in-up'>
        <form onSubmit={onSubmitHandler} className='space-y-6'>
          {/* Header */}
          <div className='text-center pb-4 border-b-2 border-orange-100'>
            <div className='flex items-center justify-center gap-3 mb-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg'>
                <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                </svg>
              </div>
              <h2 className='playfair text-4xl font-bold text-amber-800'>{currentState}</h2>
            </div>
            <p className='text-amber-600 font-medium'>
              {currentState === 'Login' ? 'Welcome back to Shoplex!' : 'Join Shoplex today!'}
            </p>
          </div>

          {/* Form Fields */}
          <div className='space-y-4'>
            {currentState === 'Sign Up' && (
              <div className='space-y-2'>
                <label className='flex items-center gap-2 text-sm font-bold text-amber-800'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className='w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all bg-white hover:border-orange-300'
                  placeholder='John Doe'
                  required
                />
              </div>
            )}

            <div className='space-y-2'>
              <label className='flex items-center gap-2 text-sm font-bold text-amber-800'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className='w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all bg-white hover:border-orange-300'
                placeholder='you@example.com'
                required
              />
            </div>

            <div className='space-y-2'>
              <label className='flex items-center gap-2 text-sm font-bold text-amber-800'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                </svg>
                Password
              </label>
              <div className='relative'>
                <input
                  onChange={(e) => setPasword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className='w-full px-4 py-3 pr-12 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all bg-white hover:border-orange-300'
                  placeholder='Enter your password'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-orange-600 transition-colors'
                >
                  {showPassword ? (
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21' />
                    </svg>
                  ) : (
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex justify-between items-center text-sm pt-2'>
            {currentState === 'Login' && (
              <button
                type='button'
                onClick={() => navigate('/forgot-password')}
                className='text-orange-600 hover:text-orange-800 font-semibold transition-colors hover:underline'
              >
                Forgot password?
              </button>
            )}
            <button
              type='button'
              onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
              className='text-orange-600 hover:text-orange-800 font-semibold transition-colors hover:underline ml-auto'
            >
              {currentState === 'Login' ? 'Create account' : 'Already have an account?'}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full btn-primary text-center py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <>
                <svg className='animate-spin h-5 w-5' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                {currentState === 'Login' ? (
                  <>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                    </svg>
                    Sign In
                  </>
                ) : (
                  <>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                    </svg>
                    Create Account
                  </>
                )}
              </>
            )}
          </button>

          {/* Privacy Notice */}
          <p className='text-center text-xs text-amber-600 pt-2'>
            By continuing, you agree to Shoplex's{' '}
            <button type='button' className='text-orange-600 hover:underline font-semibold'>Terms of Service</button>
            {' '}and{' '}
            <button type='button' className='text-orange-600 hover:underline font-semibold'>Privacy Policy</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
