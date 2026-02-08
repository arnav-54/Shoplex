import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { LucideHeart } from 'lucide-react'

const ProductItem = (props) => {
  const { image, name, price, sizes } = props;
  const id = props.id || props._id || props.item?._id || props.item?.id;

  const { currency, addToCart, formatPrice, toggleWishlist, wishlist } = useContext(ShopContext);

  console.log('ProductItem rendering with ID:', id, 'from props:', props);
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
    <div className='group relative h-full'>
      <div className='modern-card overflow-hidden p-0 h-full flex flex-col hover:border-orange-400 transition-all duration-300'>
        <Link onClick={() => { try { scrollTo(0, 0) } catch (e) { } }} to={`/product/${id}`} className='block'>
          <div className='relative overflow-hidden'>
            <img
              className='w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500'
              src={image?.[0] || '/placeholder.jpg'}
              alt={name || 'Product'}
            />
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>


            <div className='absolute top-2 left-2 sm:top-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <span className='bg-white/90 backdrop-blur-sm text-amber-800 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-sm'>Quick View</span>
            </div>
          </div>

          <div className='p-3 sm:p-4 flex-1 flex flex-col'>
            <h3 className='font-semibold text-amber-800 text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors'>
              {name}
            </h3>
            <div className='mt-auto'>
              <div className='flex items-center justify-between gap-2'>
                <p className='text-base sm:text-xl font-bold text-orange-600'>{currency}{formatPrice(price)}</p>
              </div>
              {sizes && sizes.length > 0 && (
                <p className='text-[10px] sm:text-sm text-amber-600 mt-1'>
                  Sizes: {sizes.slice(0, 2).join(', ')}{sizes.length > 2 ? '+' : ''}
                </p>
              )}
            </div>
          </div>
        </Link>


        <div className='absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:translate-y-2 lg:group-hover:translate-y-0'>
          <button
            onClick={() => { console.log('Heart clicked for ID:', id); toggleWishlist(id); }}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg ${wishlist.find(item => item && item._id && item._id.toString() === id?.toString()) ? 'bg-red-500 text-white' : 'bg-white text-orange-600 hover:text-red-500'}`}
          >
            <LucideHeart size={16} className='sm:w-5 sm:h-5' fill={wishlist.find(item => item && item._id && item._id.toString() === id?.toString()) ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleAddToCart}
            className='w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-200 hover:scale-110 shadow-lg'
          >
            <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
            </svg>
          </button>
        </div>


        {showSizes && sizes?.length > 0 && (
          <div className='absolute inset-x-2 bottom-2 sm:inset-x-4 sm:bottom-4 glass-effect rounded-xl p-3 sm:p-4 z-20 animate-fade-in-up'>
            <p className='text-[10px] sm:text-sm font-bold text-amber-800 mb-2'>Select Size:</p>
            <div className='flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSizeSelect(e, size)}
                  className={`px-2 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-sm rounded-lg font-medium transition-all ${selectedSize === size
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
                className='flex-1 btn-primary text-[10px] sm:text-sm py-2 px-0 shadow-none'
              >
                Add
              </button>
              <button
                onClick={handleCloseSizes}
                className='px-2 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors'
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductItem
