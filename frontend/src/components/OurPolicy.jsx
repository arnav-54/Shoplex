import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  const policies = [
    {
      icon: <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' /></svg>,
      title: "Hassle-Free Exchange",
      description: "Easy product exchanges within 30 days with no questions asked. Your satisfaction is our priority.",
      highlight: "30 Days"
    },
    {
      icon: <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>,
      title: "Quality Guarantee",
      description: "Premium quality products with comprehensive warranty coverage and authentic brand partnerships.",
      highlight: "100% Authentic"
    },
    {
      icon: <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>,
      title: "24/7 Customer Support",
      description: "Round-the-clock dedicated support team ready to assist you with any queries or concerns.",
      highlight: "Always Available"
    },
    {
      icon: <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' /></svg>,
      title: "Fast & Secure Delivery",
      description: "Express shipping with real-time tracking and secure packaging to ensure safe product delivery.",
      highlight: "Express Shipping"
    }
  ];

  return (
    <div className='py-12 sm:py-24 px-4 bg-gradient-to-b from-orange-50/30 to-amber-50/30'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-10 sm:mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-amber-800 mb-4'>Why Choose Shoplex?</h2>
          <p className='text-base sm:text-lg text-amber-600 max-w-2xl mx-auto'>Experience excellence in every aspect of your shopping journey with our commitment to quality, service, and customer satisfaction.</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
          {policies.map((policy, index) => (
            <div key={index} className='modern-card text-center p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group'>
              <div className='w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300'>
                {React.cloneElement(policy.icon, { className: 'w-6 h-6 sm:w-8 sm:h-8' })}
              </div>
              <div className='mb-2 sm:mb-3'>
                <span className='inline-block px-3 py-1 bg-orange-100 text-orange-600 text-[10px] sm:text-xs font-semibold rounded-full'>
                  {policy.highlight}
                </span>
              </div>
              <h3 className='font-bold text-lg sm:text-xl text-amber-800 mb-2 sm:mb-4'>{policy.title}</h3>
              <p className='text-sm sm:text-base text-amber-600 leading-relaxed'>{policy.description}</p>
            </div>
          ))}
        </div>

        <div className='text-center mt-10 sm:mt-16'>
          <div className='inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm sm:text-base font-semibold shadow-lg'>
            <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
            </svg>
            Trusted by 50,000+ Happy Customers
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
