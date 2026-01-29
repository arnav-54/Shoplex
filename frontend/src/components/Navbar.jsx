import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import CurrencySwitcher from './CurrencySwitcher';

const Navbar = () => {

    const [visible, setVisible] = useState(false);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, wishlist } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className='bg-white/80 backdrop-blur-md flex items-center justify-between py-3 px-3 sm:px-6 mx-2 sm:mx-4 my-2 rounded-2xl shadow-lg border-b-2 border-orange-200 sticky top-2 z-50 animate-fade-in-up transition-all duration-300'>

            <Link to='/' className='flex items-center gap-2 sm:gap-3'>
                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center text-white'>
                    <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
                    </svg>
                </div>
                <span className='playfair text-xl sm:text-2xl font-bold text-amber-800'>Shoplex</span>
            </Link>

            <ul className='hidden lg:flex gap-8 text-sm font-medium'>

                <NavLink to='/' className='flex flex-col items-center gap-1 text-amber-800 hover:text-orange-600 transition-all duration-200 py-2 px-4 rounded-lg hover:bg-orange-50'>
                    <p className='font-medium'>Home</p>
                    <hr className='w-2/4 border-none h-[2px] bg-orange-500 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 text-amber-800 hover:text-orange-600 transition-all duration-200 py-2 px-4 rounded-lg hover:bg-orange-50'>
                    <p className='font-medium'>Shop</p>
                    <hr className='w-2/4 border-none h-[2px] bg-orange-500 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 text-amber-800 hover:text-orange-600 transition-all duration-200 py-2 px-4 rounded-lg hover:bg-orange-50'>
                    <p className='font-medium'>About</p>
                    <hr className='w-2/4 border-none h-[2px] bg-orange-500 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 text-amber-800 hover:text-orange-600 transition-all duration-200 py-2 px-4 rounded-lg hover:bg-orange-50'>
                    <p className='font-medium'>Contact</p>
                    <hr className='w-2/4 border-none h-[2px] bg-orange-500 hidden' />
                </NavLink>

            </ul>

            <div className='flex items-center gap-2 sm:gap-4'>
                <div className='hidden lg:block'>
                    <CurrencySwitcher />
                </div>
                <button onClick={() => { setShowSearch(true); navigate('/collection') }} className='w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange-200 hover:text-orange-700 transition-all duration-200'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                    </svg>
                </button>

                <div className='relative'>
                    {token ? (
                        <button className='w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange-200 hover:text-orange-700 transition-all duration-200 group'>
                            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                            </svg>

                            {/* Dropdown Menu */}
                            <div className='absolute top-full right-0 mt-2 w-48 modern-card py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                                <div className='px-4 py-2 border-b border-gray-100'>
                                    <p className='text-sm font-semibold text-gray-800'>Account</p>
                                </div>
                                <button onClick={() => navigate('/orders')} className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors flex items-center gap-3'>
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                                    </svg>
                                    My Orders
                                </button>
                                <button onClick={() => navigate('/profile')} className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors flex items-center gap-3'>
                                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                    </svg>
                                    Profile
                                </button>
                                <div className='border-t border-gray-100 mt-1'>
                                    <button onClick={logout} className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3'>
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className='flex items-center gap-2 bg-amber-800 text-white px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-amber-900 transition-all shadow-md active:scale-95'
                        >
                            <svg className='w-4 h-4 hidden sm:block' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                            </svg>
                            Login
                        </button>
                    )}
                </div>
                <Link to='/wishlist' className='relative'>
                    <button className='w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center hover:bg-orange-200 transition-all duration-200'>
                        <svg className='w-5 h-5 text-amber-800' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                        </svg>
                    </button>
                    {wishlist.length > 0 && (
                        <span className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white rounded-full text-[10px] sm:text-xs font-medium flex items-center justify-center animate-pulse'>
                            {wishlist.length}
                        </span>
                    )}
                </Link>
                <Link to='/cart' className='relative'>
                    <button className='w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center hover:bg-orange-200 hover:text-orange-700 transition-all duration-200'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01' />
                        </svg>
                    </button>
                    {getCartCount() > 0 && (
                        <span className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 text-white rounded-full text-[10px] sm:text-xs font-medium flex items-center justify-center'>
                            {getCartCount()}
                        </span>
                    )}
                </Link>
                <button onClick={() => setVisible(true)} className='w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center lg:hidden hover:bg-orange-200 transition-colors'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                    </svg>
                </button>
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-gradient-to-b from-orange-50 to-amber-50 transition-all z-[60] ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-amber-800 h-full'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-6 cursor-pointer bg-white shadow-sm'>
                        <svg className='w-6 h-6 rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                        <p className='text-lg font-bold'>Menu</p>
                    </div>
                    <div className='flex flex-col p-4 gap-2'>
                        <NavLink onClick={() => setVisible(false)} className='py-4 px-6 rounded-xl font-semibold hover:bg-orange-100 transition-all flex items-center gap-4' to='/'>
                            <span className='text-2xl'>🏠</span> HOME
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-4 px-6 rounded-xl font-semibold hover:bg-orange-100 transition-all flex items-center gap-4' to='/collection'>
                            <span className='text-2xl'>🛍️</span> SHOP
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-4 px-6 rounded-xl font-semibold hover:bg-orange-100 transition-all flex items-center gap-4' to='/about'>
                            <span className='text-2xl'>🐻</span> ABOUT US
                        </NavLink>
                        <NavLink onClick={() => setVisible(false)} className='py-4 px-6 rounded-xl font-semibold hover:bg-orange-100 transition-all flex items-center gap-4' to='/contact'>
                            <span className='text-2xl'>💬</span> SUPPORT
                        </NavLink>
                    </div>

                    <div className='mt-auto p-8 bg-orange-100/50 rounded-t-[3rem]'>
                        <CurrencySwitcher />
                        <p className='text-center text-xs text-amber-600 mt-6'>© 2024 Shoplex. Premium Quality Fashion.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
