import React from 'react'

const SeasonalBanner = () => {
  return (
    <div className='mx-4 my-8'>
      <div className='bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-3xl p-8 text-center relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-400/20'></div>
        <div className='relative z-10'>
          <div className='flex justify-center items-center gap-4 mb-4'>
            <span className='text-4xl animate-bounce'>🍂</span>
            <h2 className='text-3xl font-bold text-white'>Autumn Collection</h2>
            <span className='text-4xl animate-bounce'>🍂</span>
          </div>
          <p className='text-white/90 text-lg mb-6 max-w-2xl mx-auto'>
            Embrace the cozy season with our warm and comfortable autumn essentials. 
            Perfect for those crisp forest walks and fireside evenings! 🔥
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <button className='bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition-colors flex items-center gap-2'>
              <span>🛍️</span>
              Shop Autumn Collection
            </button>
            <div className='bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-semibold'>
              🏷️ Up to 30% OFF
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className='absolute top-4 left-4 text-2xl opacity-50'>🐻</div>
        <div className='absolute top-8 right-8 text-2xl opacity-50'>🍯</div>
        <div className='absolute bottom-4 left-8 text-2xl opacity-50'>🌲</div>
        <div className='absolute bottom-8 right-4 text-2xl opacity-50'>🏠</div>
      </div>
    </div>
  )
}

export default SeasonalBanner