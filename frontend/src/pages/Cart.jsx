import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, updateCartItemSize, navigate, formatPrice } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>

      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col gap-4 sm:grid sm:grid-cols-[4fr_2fr_0.5fr] sm:items-center'>
                <div className=' flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded-md object-cover' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-sm sm:text-lg font-medium text-amber-900'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='text-orange-600 font-bold'>{currency}{formatPrice(productData.price)}</p>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-500'>Size:</span>
                        <select
                          onChange={(e) => updateCartItemSize(item._id, item.size, e.target.value)}
                          className='px-2 py-1 border border-orange-200 bg-orange-50 rounded text-amber-800 text-xs sm:text-sm focus:outline-none focus:border-orange-500'
                          value={item.size}
                        >
                          {productData.sizes.map((size, i) => (
                            <option key={i} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between sm:justify-start sm:gap-4 w-full'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-500 sm:hidden'>Quantity:</span>
                    <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border border-orange-200 rounded max-w-16 sm:max-w-20 px-2 py-1 focus:outline-none focus:border-orange-500' type="number" min={1} defaultValue={item.quantity} />
                  </div>
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-5 cursor-pointer hover:scale-110 transition-transform sm:mr-4' src={assets.bin_icon} alt="Remove" />
                </div>
              </div>
            )

          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className=' w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart
