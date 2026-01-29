import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-gradient-to-b from-orange-50 to-amber-100 mt-20'>
      <div className='modern-card mx-2 sm:mx-4 mb-8'>
        <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] md:grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-14 py-10 px-6 sm:py-16 sm:px-8 text-sm'>

          <div className='text-center sm:text-left'>
            <div className='flex items-center justify-center sm:justify-start gap-3 mb-6'>
              <div className='w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                </svg>
              </div>
              <span className='playfair text-2xl font-bold text-amber-800'>Shoplex</span>
            </div>
            <p className='w-full lg:w-2/3 text-amber-700 leading-relaxed text-base'>
              Welcome to Shoplex! We're a modern e-commerce platform dedicated to bringing you the finest quality products. Every item is carefully curated for your satisfaction and style.
            </p>
            <div className='flex justify-center sm:justify-start gap-4 mt-6'>
              <a href='https://twitter.com/shoplex' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-300 transition-colors'>
                <svg className='w-5 h-5 text-orange-700' fill='currentColor' viewBox='0 0 24 24'><path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' /></svg>
              </a>
              <a href='https://instagram.com/shoplex' target='_blank' rel='noopener noreferrer' className='w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-300 transition-colors'>
                <svg className='w-5 h-5 text-orange-700' fill='currentColor' viewBox='0 0 24 24'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' /></svg>
              </a>
              <a href='mailto:support@shoplex.com' className='w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-300 transition-colors'>
                <svg className='w-5 h-5 text-orange-700' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg>
              </a>
            </div>
          </div>

          <div className='text-center sm:text-left'>
            <p className='text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-800'>
              COMPANY
            </p>
            <ul className='flex flex-col gap-2 sm:gap-3 text-amber-700'>
              <li><Link to='/' className='hover:text-orange-600 cursor-pointer transition-colors'>Home</Link></li>
              <li><Link to='/about' className='hover:text-orange-600 cursor-pointer transition-colors'>About us</Link></li>
              <li><Link to='/contact' className='hover:text-orange-600 cursor-pointer transition-colors'>Contact</Link></li>
            </ul>
          </div>

          <div className='text-center sm:text-left'>
            <p className='text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-800'>
              GET IN TOUCH
            </p>
            <ul className='flex flex-col gap-2 sm:gap-3 text-amber-700 items-center sm:items-start'>
              <li className='flex items-center gap-3'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' /></svg>
                <span>+1-212-456-7890</span>
              </li>
              <li className='flex items-center gap-3 text-xs sm:text-sm'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' /></svg>
                <span>hello@Shoplex.com</span>
              </li>
              <li className='flex items-center gap-3 text-xs sm:text-sm'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
                <span>Mon-Fri 9AM-6PM</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className='bg-amber-800 text-center py-6'>
        <div className='flex justify-center items-center gap-2 mb-2'>
          <span className='text-orange-200 font-semibold'>Made with care by Shoplex Team</span>
        </div>
        <p className='text-orange-100 text-sm'>Copyright 2025 © Shoplex - All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
