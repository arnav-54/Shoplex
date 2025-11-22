import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price,sizes}) => {
    
    const {currency, addToCart} = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('');
    const [showSizes, setShowSizes] = useState(false);

    const handleSizeSelect = (e, size) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedSize(size);
    };

    const handleCloseSizes = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowSizes(false);
        setSelectedSize('');
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!id || !image || !name || !price) {
            console.error('Missing required product data');
            return;
        }
        
        if (!selectedSize && sizes?.length > 0) {
            setShowSizes(true);
            return;
        }
        
        try {
            const size = selectedSize || sizes?.[0] || 'M';
            await addToCart(id, size);
            setShowSizes(false);
            setSelectedSize('');
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

  return (
    <div className='group relative'>
      <div className='modern-card overflow-hidden p-0 h-full flex flex-col'>
        <Link onClick={()=>{try{scrollTo(0,0)}catch(e){}}} to={`/product/${id}`} className='block'>
          <div className='relative overflow-hidden'>
            <img 
              className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300' 
              src={image?.[0] || '/placeholder.jpg'} 
              alt={name || 'Product'} 
            />
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
            
            {/* Quick view badge */}
            <div className='absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <span className='badge badge-primary text-xs'>Quick View</span>
            </div>
          </div>
          
          <div className='p-4 flex-1 flex flex-col'>
            <h3 className='font-semibold text-amber-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors'>
              {name}
            </h3>
            <div className='mt-auto'>
              <p className='text-xl font-bold text-orange-600'>{currency}{price}</p>
              {sizes && sizes.length > 0 && (
                <p className='text-sm text-amber-600 mt-1'>
                  Sizes: {sizes.slice(0, 3).join(', ')}{sizes.length > 3 ? '...' : ''}
                </p>
              )}
            </div>
          </div>
        </Link>
      
        {/* Size selector overlay */}
        {showSizes && sizes?.length > 0 && (
          <div className='absolute inset-x-4 bottom-4 glass-effect rounded-xl p-4 z-20 animate-fade-in-up'>
            <p className='text-sm font-bold text-amber-800 mb-3'>Select Size:</p>
            <div className='flex gap-2 mb-4 flex-wrap'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSizeSelect(e, size)}
                  className={`px-3 py-2 text-sm rounded-lg font-medium transition-all ${
                    selectedSize === size 
                      ? 'bg-orange-500 text-white shadow-md' 
                      : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className='flex gap-2'>
              <button
                onClick={handleAddToCart}
                className='flex-1 btn-primary text-sm py-2'
              >
                Add to Cart
              </button>
              <button
                onClick={handleCloseSizes}
                className='px-3 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className='absolute bottom-4 right-4 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-200 hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProductItem
