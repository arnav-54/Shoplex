import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center py-16 px-4'>
      <h2 className='text-3xl font-bold text-amber-800 mb-4'>Subscribe now & get 20% off</h2>
      <p className='text-amber-600 mt-3 max-w-md mx-auto'>
      Don’t miss out! Subscribe today to get helpful content, product news, and special offers — starting with 20% off.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-8 modern-card p-2'>
        <input 
          className='w-full sm:flex-1 outline-none bg-transparent px-4 py-2 text-amber-800 placeholder-amber-400' 
          type="email" 
          placeholder='Enter your email' 
          required
        />
        <button type='submit' className='btn-primary px-8 py-3 text-sm font-bold'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
