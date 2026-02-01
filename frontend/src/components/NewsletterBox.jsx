import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing! Check your email for the 20% discount code.')
      setEmail('')
    }
  }

  return (
    <div className='text-center py-16 px-4'>
      <h2 className='text-3xl font-bold text-amber-800 mb-4'>Subscribe now & get 20% off</h2>
      <p className='text-amber-600 mt-3 max-w-md mx-auto'>
        Don’t miss out! Subscribe today to get helpful content, product news, and special offers — starting with 20% off.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 lg:w-1/2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mx-auto my-8 modern-card p-3 sm:p-2'>
        <input
          className='w-full sm:flex-1 outline-none bg-transparent px-4 py-3 sm:py-2 text-amber-800 placeholder-amber-400 border-b sm:border-b-0 border-orange-100 sm:border-none mb-2 sm:mb-0'
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='submit' className='btn-primary px-8 py-3 text-sm font-bold w-full sm:w-auto mt-2 sm:mt-0'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
