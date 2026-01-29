import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='modern-card mx-4 my-8 overflow-hidden hero-section animate-fade-in-up'>
      <div className='flex flex-col lg:flex-row min-h-[500px] lg:min-h-[600px]'>
        {/* Hero Left Side */}
        <div className='w-full lg:w-1/2 flex items-center justify-center py-12 lg:py-0 bg-gradient-to-br from-orange-50 to-amber-50'>
          <div className='text-center lg:text-left px-6 lg:px-12 max-w-lg'>
            <div className='inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6'>
              <svg className='w-3.5 h-3.5 sm:w-4 sm:h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
              </svg>
              PREMIUM QUALITY
            </div>
            <h1 className='playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-amber-800'>
              Welcome to
              <span className='text-orange-600 block'>Shoplex</span>
            </h1>
            <p className='text-amber-700 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed'>
              Discover comfort and style in our curated collection of premium clothing designed for modern living.
            </p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'>
              <button className='btn-primary flex items-center justify-center gap-2 py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                </svg>
                Shop Collection
              </button>
              <button className='btn-secondary flex items-center justify-center gap-2 py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                Learn More
              </button>
            </div>

            <div className='flex items-center gap-6 sm:gap-8 mt-10 sm:mt-12 justify-center lg:justify-start overflow-x-auto pb-4 sm:pb-0'>
              <div className='text-center min-w-fit'>
                <div className='text-xl sm:text-2xl font-bold text-amber-800'>10K+</div>
                <div className='text-xs sm:text-sm text-amber-600'>Happy Customers</div>
              </div>
              <div className='text-center min-w-fit'>
                <div className='text-xl sm:text-2xl font-bold text-amber-800'>500+</div>
                <div className='text-xs sm:text-sm text-amber-600'>Products</div>
              </div>
              <div className='text-center min-w-fit'>
                <div className='text-xl sm:text-2xl font-bold text-amber-800'>4.9</div>
                <div className='text-xs sm:text-sm text-amber-600'>Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Right Side */}
        <div className='w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-auto overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100'>
          <img className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-700' src={assets.hero_img} alt='Fashion Collection' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>

          {/* Floating Cards */}
          <div className='absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-slide-in-right shadow-lg'>
            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0'>
                <svg className='w-4 h-4 sm:w-5 sm:h-5 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
              </div>
              <div>
                <div className='font-bold text-sm sm:text-base text-amber-800'>Free Shipping</div>
                <div className='text-xs sm:text-sm text-orange-600'>On orders over ₹500</div>
              </div>
            </div>
          </div>

          <div className='absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg'>
            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0'>
                <svg className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              </div>
              <div>
                <div className='font-bold text-sm sm:text-base text-amber-800'>Premium Quality</div>
                <div className='text-xs sm:text-sm text-orange-600'>Carefully curated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
