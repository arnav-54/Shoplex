import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  const policies = [
    {
      icon: <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' /></svg>,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy"
    },
    {
      icon: <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy"
    },
    {
      icon: <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' /></svg>,
      title: "Best customer support", 
      description: "we provide 24/7 customer support"
    }
  ];

  return (
    <div className='py-20 px-4'>
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-8 text-center max-w-4xl mx-auto'>
        {policies.map((policy, index) => (
          <div key={index} className='flex-1'>
            <div className='w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600'>
              {policy.icon}
            </div>
            <h3 className='font-bold text-lg text-amber-800 mb-2'>{policy.title}</h3>
            <p className='text-amber-600'>{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy
