import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, Truck } from 'lucide-react';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, updateCartItemSize, navigate, formatPrice } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const tempData = [];
      const productMap = new Map(products.map(p => [String(p._id || p.id), p]));

      for (const itemId in cartItems) {
        // Skip any orphaned product IDs that no longer exist in the store
        if (!productMap.has(String(itemId))) continue;

        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: String(itemId),
              size: size,
              quantity: cartItems[itemId][size]
            });
          }
        }
      }
      setCartData(tempData);
    } else {
      setCartData([]);
    }
  }, [cartItems, products]);

  // If cart is empty, render the clean, luxury empty state
  if (cartData.length === 0) {
    return (
      <div className='py-16 sm:py-24 px-4 flex flex-col items-center justify-center text-center animate-fade-in-up min-h-[60vh]'>
        <div className='w-20 h-20 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-3xl flex items-center justify-center text-[var(--accent)] mb-6 shadow-sm'>
          <ShoppingBag size={36} strokeWidth={1.5} />
        </div>
        <h2 className='font-heading text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-3 tracking-tight'>
          Your Shopping Bag is Empty
        </h2>
        <p className='text-sm text-[var(--ink-muted)] max-w-md mx-auto mb-8 leading-relaxed'>
          Looks like you haven't added anything to your bag yet. Explore our latest luxury collections to find your next statement piece.
        </p>
        <button
          onClick={() => navigate('/collection')}
          className='btn-primary px-8 py-3.5 text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2.5 shadow-md'
        >
          <span>Explore Collection</span>
          <ArrowRight size={16} />
        </button>

        {/* Value Props */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 max-w-lg w-full text-left'>
          <div className='p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex items-center gap-3'>
            <Truck size={20} className='text-[var(--accent)] shrink-0' />
            <div>
              <p className='text-xs font-bold text-[var(--ink)]'>Free Express Delivery</p>
              <p className='text-[11px] text-[var(--ink-muted)]'>On all orders above ₹999</p>
            </div>
          </div>
          <div className='p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex items-center gap-3'>
            <ShieldCheck size={20} className='text-emerald-500 shrink-0' />
            <div>
              <p className='text-xs font-bold text-[var(--ink)]'>Secure Checkout</p>
              <p className='text-[11px] text-[var(--ink-muted)]'>256-bit SSL encrypted payments</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='pt-8 sm:pt-14 pb-20 animate-fade-in-up'>
      <div className='text-2xl sm:text-3xl mb-8'>
        <Title text1={'SHOPPING'} text2={'BAG'} />
      </div>

      <div className='space-y-4'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => String(product._id || product.id) === String(item._id));
          if (!productData) return null;

          const productImage = Array.isArray(productData.image) && productData.image.length > 0 
            ? productData.image[0] 
            : 'https://res.cloudinary.com/dx1hth42p/image/upload/v1793296373/shoplex_curated_clothes/og835j1xjudizznq6f9w.jpg';

          return (
            <div 
              key={`${item._id}-${item.size}-${index}`} 
              className='p-4 sm:p-5 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex flex-col sm:grid sm:grid-cols-[4fr_2fr_0.5fr] sm:items-center gap-4 transition-all hover:border-[var(--border-strong)]'
            >
              {/* Product Info */}
              <div className='flex items-start gap-4 sm:gap-5'>
                <div className='w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-elevated)] shrink-0'>
                  <img 
                    className='w-full h-full object-cover' 
                    src={productImage} 
                    alt={productData.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://res.cloudinary.com/dx1hth42p/image/upload/v1793296373/shoplex_curated_clothes/og835j1xjudizznq6f9w.jpg';
                    }}
                  />
                </div>
                <div className='flex-1 min-w-0'>
                  <h3 className='font-heading text-sm sm:text-base font-bold text-[var(--ink)] line-clamp-1'>
                    {productData.name}
                  </h3>
                  <p className='text-xs text-[var(--ink-muted)] mt-0.5 capitalize'>
                    {productData.category} • {productData.subCategory}
                  </p>

                  <div className='flex items-center gap-4 mt-3'>
                    <span className='text-[var(--accent)] font-extrabold text-sm sm:text-base'>
                      {currency}{formatPrice(productData.price)}
                    </span>

                    {/* Size Selector */}
                    {productData.sizes && productData.sizes.length > 0 && (
                      <div className='flex items-center gap-1.5'>
                        <span className='text-xs text-[var(--ink-muted)] font-semibold'>Size:</span>
                        <select
                          onChange={(e) => updateCartItemSize(item._id, item.size, e.target.value)}
                          className='px-2 py-1 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-lg text-xs font-semibold text-[var(--ink)] outline-none focus:border-[var(--ink)] cursor-pointer'
                          value={item.size}
                        >
                          {productData.sizes.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className='flex items-center justify-between sm:justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border)]'>
                <span className='text-xs text-[var(--ink-muted)] font-bold uppercase sm:hidden'>Quantity:</span>
                <div className='flex items-center border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--surface-elevated)]'>
                  <button
                    type='button'
                    onClick={() => updateQuantity(item._id, item.size, Math.max(0, item.quantity - 1))}
                    className='w-8 h-8 flex items-center justify-center text-sm font-bold text-[var(--ink)] hover:bg-[var(--surface)] transition-colors'
                  >
                    -
                  </button>
                  <span className='w-10 text-center text-xs font-bold text-[var(--ink)]'>
                    {item.quantity}
                  </span>
                  <button
                    type='button'
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                    className='w-8 h-8 flex items-center justify-center text-sm font-bold text-[var(--ink)] hover:bg-[var(--surface)] transition-colors'
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Action */}
              <div className='flex justify-end'>
                <button 
                  onClick={() => updateQuantity(item._id, item.size, 0)} 
                  className='p-2 rounded-xl text-[var(--ink-muted)] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors'
                  title="Remove Item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary & Checkout */}
      <div className='flex justify-end mt-12'>
        <div className='w-full sm:w-[480px]'>
          <CartTotal />
          <div className='w-full text-end mt-6'>
            <button 
              onClick={() => navigate('/place-order')} 
              className='btn-primary w-full py-4 text-sm uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 shadow-lg'
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
