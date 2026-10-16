import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = ({ discount = 0, couponCode = null }) => {

  const { currency, delivery_fee, getCartAmount, formatPrice } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const effectiveShipping = subtotal >= 999 ? 0 : delivery_fee;
  const total = subtotal === 0 ? 0 : Math.max(0, subtotal - discount + effectiveShipping);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {formatPrice(subtotal)}</p>
        </div>
        <hr />
        {discount > 0 && (
          <>
            <div className='flex justify-between text-green-600'>
              <p className='flex items-center gap-1.5'>
                <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                </svg>
                Discount {couponCode && <span className='text-xs font-bold'>({couponCode})</span>}
              </p>
              <p>-{currency} {formatPrice(discount)}</p>
            </div>
            <hr />
          </>
        )}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1.5'>
            <p>Shipping Fee</p>
            {subtotal >= 999 && subtotal > 0 && (
              <span className='text-[10px] font-bold text-green-700 bg-green-100 dark:bg-green-900/40 dark:text-green-300 px-1.5 py-0.5 rounded'>
                OVER ₹999
              </span>
            )}
          </div>
          {effectiveShipping === 0 && subtotal > 0 ? (
            <span className='text-xs font-bold text-green-600 uppercase tracking-wider bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded'>
              FREE
            </span>
          ) : (
            <p>{currency} {formatPrice(delivery_fee)}</p>
          )}
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {formatPrice(total)}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
