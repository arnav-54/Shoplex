import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import CurrencySwitcher from './CurrencySwitcher';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', stored);
        return stored;
    });

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
    };

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, wishlist, setCartOpen } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <>
            <nav className='glass-effect sticky top-0 z-50 border-b border-[var(--border)]'>
            <div className='flex items-center justify-between py-4 px-4 sm:px-8 max-w-[1400px] mx-auto'>

                {/* Logo */}
                <Link to='/' className='flex items-center gap-1'>
                    <span className='font-heading text-xl sm:text-2xl font-800 tracking-[0.08em] uppercase' style={{color: 'var(--ink)'}}>
                        Shop<span className='text-[var(--accent)]'>lex</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className='hidden lg:flex items-center gap-1'>
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/collection', label: 'Shop' },
                        { to: '/about', label: 'About' },
                        { to: '/contact', label: 'Contact' },
                    ].map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative px-5 py-2 text-sm font-medium transition-colors duration-200
                                ${isActive 
                                    ? 'text-[var(--ink)]' 
                                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {label}
                                    {isActive && (
                                        <span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-[var(--accent)] rounded-full'></span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </ul>

                {/* Actions */}
                <div className='flex items-center gap-2 sm:gap-3'>
                    <div className='hidden lg:block'>
                        <CurrencySwitcher />
                    </div>

                    {/* Search */}
                    <button 
                        onClick={() => { setShowSearch(true); navigate('/collection') }}
                        className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'
                    >
                        <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                        </svg>
                    </button>

                    {/* Theme Toggle (Calm Mode) */}
                    <button 
                        onClick={toggleTheme}
                        className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'
                        title={theme === 'light' ? 'Switch to Calm Mode' : 'Switch to Light Mode'}
                    >
                        {theme === 'light' ? (
                            <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
                            </svg>
                        ) : (
                            <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z' />
                            </svg>
                        )}
                    </button>

                    {/* Profile / Login */}
                    <div className='relative'>
                        {token ? (
                            <button className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200 group'>
                                <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                </svg>

                                {/* Dropdown */}
                                <div className='absolute top-full right-0 mt-2 w-52 bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden'>
                                    <div className='px-4 py-3 border-b border-[var(--border)]'>
                                        <p className='text-sm font-semibold' style={{color: 'var(--ink)'}}>My Account</p>
                                    </div>
                                    <button onClick={() => navigate('/orders')} className='w-full text-left px-4 py-2.5 text-sm text-[var(--ink-soft)] hover:bg-[var(--surface-elevated)] hover:text-[var(--ink)] transition-colors flex items-center gap-3'>
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                                        </svg>
                                        Orders
                                    </button>
                                    <button onClick={() => navigate('/profile')} className='w-full text-left px-4 py-2.5 text-sm text-[var(--ink-soft)] hover:bg-[var(--surface-elevated)] hover:text-[var(--ink)] transition-colors flex items-center gap-3'>
                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                        </svg>
                                        Profile
                                    </button>
                                    <div className='border-t border-[var(--border)]'>
                                        <button onClick={logout} className='w-full text-left px-4 py-2.5 text-sm text-[var(--error)] hover:bg-[var(--error-soft)] transition-colors flex items-center gap-3'>
                                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className='hidden sm:flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--accent)] transition-colors'
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Wishlist */}
                    <Link to='/wishlist' className='relative'>
                        <div className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'>
                            <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                            </svg>
                        </div>
                        {wishlist.length > 0 && (
                            <span className='absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] text-white rounded-full text-[10px] font-bold flex items-center justify-center'>
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <button 
                        onClick={() => setCartOpen(true)}
                        className='relative w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'
                    >
                        <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                        </svg>
                        {getCartCount() > 0 && (
                            <span className='absolute -top-1 -right-1 w-4 h-4 bg-[var(--ink)] text-white rounded-full text-[10px] font-bold flex items-center justify-center'>
                                {getCartCount()}
                            </span>
                        )}
                    </button>

                    {/* Mobile Login */}
                    {!token && (
                        <button
                            onClick={() => navigate('/login')}
                            className='sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200'
                        >
                            <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                            </svg>
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setVisible(true)} className='w-9 h-9 flex items-center justify-center rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] transition-all duration-200 lg:hidden'>
                        <svg className='w-[18px] h-[18px]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M4 6h16M4 12h16M4 18h16' />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>

        {/* Mobile Drawer — Portal to document.body to prevent backdrop-filter clipping & blur inheritance */}
        {typeof document !== 'undefined' && createPortal(
            <div className='lg:hidden'>
                {/* Backdrop */}
                <div 
                    className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[99998] transition-opacity duration-300 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setVisible(false)}
                    aria-hidden={!visible}
                />

                {/* Solid Luxury Mobile Drawer Panel */}
                <div 
                    className={`fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] h-full min-h-[100dvh] z-[99999] shadow-2xl border-l transition-transform duration-300 ease-out flex flex-col ${visible ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
                    style={{ 
                        backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
                        color: theme === 'dark' ? '#ffffff' : '#0f172a',
                        borderColor: theme === 'dark' ? '#27272a' : '#e2e8f0'
                    }}
                    aria-hidden={!visible}
                >
                    {/* Drawer Header */}
                    <div 
                        className='flex items-center justify-between p-5 border-b'
                        style={{ 
                            backgroundColor: theme === 'dark' ? '#121214' : '#f8fafc',
                            borderColor: theme === 'dark' ? '#27272a' : '#e2e8f0'
                        }}
                    >
                        <div className='flex items-center gap-2'>
                            <span 
                                className='font-heading text-lg font-extrabold tracking-wider uppercase'
                                style={{ color: theme === 'dark' ? '#ffffff' : '#0f172a' }}
                            >
                                Shop<span className='text-[var(--accent)]'>lex</span>
                            </span>
                            <span className='text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]'>
                                Menu
                            </span>
                        </div>
                        <button 
                            onClick={() => setVisible(false)} 
                            className='w-9 h-9 flex items-center justify-center rounded-xl border transition-all hover:scale-105 active:scale-95'
                            style={{ 
                                backgroundColor: theme === 'dark' ? '#27272a' : '#ffffff',
                                borderColor: theme === 'dark' ? '#3f3f46' : '#cbd5e1',
                                color: theme === 'dark' ? '#ffffff' : '#0f172a'
                            }}
                            aria-label='Close menu'
                        >
                            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>

                    {/* User Quick Bar */}
                    {token ? (
                        <div 
                            className='px-5 py-3.5 border-b flex items-center justify-between'
                            style={{ 
                                backgroundColor: theme === 'dark' ? '#1c1c20' : '#f1f5f9',
                                borderColor: theme === 'dark' ? '#27272a' : '#e2e8f0'
                            }}
                        >
                            <div className='flex items-center gap-3'>
                                <div className='w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm'>
                                    U
                                </div>
                                <div>
                                    <p className='text-xs font-bold' style={{ color: theme === 'dark' ? '#ffffff' : '#0f172a' }}>My Account</p>
                                    <p className='text-[11px]' style={{ color: theme === 'dark' ? '#a1a1aa' : '#64748b' }}>Logged In</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setVisible(false); navigate('/profile'); }}
                                className='text-xs font-semibold text-[var(--accent)] hover:underline'
                            >
                                View
                            </button>
                        </div>
                    ) : (
                        <div 
                            className='p-4 border-b'
                            style={{ 
                                backgroundColor: theme === 'dark' ? '#121214' : '#f8fafc',
                                borderColor: theme === 'dark' ? '#27272a' : '#e2e8f0'
                            }}
                        >
                            <button
                                onClick={() => { setVisible(false); navigate('/login'); }}
                                className='btn-primary w-full py-2.5 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm'
                            >
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                                </svg>
                                Sign In / Register
                            </button>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <div className='flex-1 overflow-y-auto p-4 space-y-1.5'>
                        <p 
                            className='text-[11px] uppercase font-extrabold tracking-widest px-3 py-1'
                            style={{ color: theme === 'dark' ? '#a1a1aa' : '#475569' }}
                        >
                            Explore
                        </p>
                        {[
                            { 
                                to: '/', 
                                label: 'Home', 
                                icon: (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
                                    </svg>
                                ) 
                            },
                            { 
                                to: '/collection', 
                                label: 'Shop Catalog', 
                                badge: 'New',
                                icon: (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                                    </svg>
                                ) 
                            },
                            { 
                                to: '/about', 
                                label: 'About Us', 
                                icon: (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                ) 
                            },
                            { 
                                to: '/contact', 
                                label: 'Contact & Support', 
                                icon: (
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                                    </svg>
                                ) 
                            },
                        ].map(({ to, label, icon, badge }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setVisible(false)}
                                className={({ isActive }) =>
                                    `flex items-center justify-between py-3 px-4 rounded-xl font-bold text-[15px] transition-all duration-200
                                    ${isActive 
                                        ? 'bg-[var(--accent-soft)] text-[var(--accent)] border-l-4 border-[var(--accent)] shadow-xs' 
                                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                    }`
                                }
                                style={({ isActive }) => ({
                                    color: isActive ? 'var(--accent)' : (theme === 'dark' ? '#ffffff' : '#0f172a')
                                })}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className='flex items-center gap-3.5'>
                                            <span style={{ color: isActive ? 'var(--accent)' : (theme === 'dark' ? '#94a3b8' : '#475569') }}>
                                                {icon}
                                            </span>
                                            <span style={{ color: isActive ? 'var(--accent)' : (theme === 'dark' ? '#ffffff' : '#0f172a') }}>
                                                {label}
                                            </span>
                                        </div>
                                        {badge && (
                                            <span className='text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[var(--accent)] text-white shadow-xs'>
                                                {badge}
                                            </span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}

                        {/* Customer Shortcuts if logged in */}
                        {token && (
                            <>
                                <p 
                                    className='text-[11px] uppercase font-extrabold tracking-widest px-3 pt-5 pb-1'
                                    style={{ color: theme === 'dark' ? '#a1a1aa' : '#475569' }}
                                >
                                    My Shortcuts
                                </p>
                                <button
                                    onClick={() => { setVisible(false); navigate('/orders'); }}
                                    className='w-full flex items-center gap-3.5 py-3 px-4 rounded-xl font-bold text-[15px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left'
                                    style={{ color: theme === 'dark' ? '#ffffff' : '#0f172a' }}
                                >
                                    <svg className='w-5 h-5 text-neutral-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                                    </svg>
                                    <span>My Orders</span>
                                </button>
                                <button
                                    onClick={() => { setVisible(false); navigate('/wishlist'); }}
                                    className='w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-[15px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left'
                                    style={{ color: theme === 'dark' ? '#ffffff' : '#0f172a' }}
                                >
                                    <div className='flex items-center gap-3.5'>
                                        <svg className='w-5 h-5 text-neutral-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                                        </svg>
                                        <span>Wishlist</span>
                                    </div>
                                    {wishlist.length > 0 && (
                                        <span className='text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white'>
                                            {wishlist.length}
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={() => { setVisible(false); logout(); }}
                                    className='w-full flex items-center gap-3.5 py-3 px-4 rounded-xl font-bold text-[15px] text-[var(--error)] hover:bg-[var(--error-soft)] transition-colors text-left mt-2'
                                >
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                                    </svg>
                                    <span>Sign Out</span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Drawer Footer */}
                    <div 
                        className='p-5 border-t'
                        style={{ 
                            backgroundColor: theme === 'dark' ? '#121214' : '#f8fafc',
                            borderColor: theme === 'dark' ? '#27272a' : '#e2e8f0'
                        }}
                    >
                        <div className='flex items-center justify-between'>
                            <span 
                                className='text-xs font-bold uppercase tracking-wider'
                                style={{ color: theme === 'dark' ? '#a1a1aa' : '#64748b' }}
                            >
                                Currency
                            </span>
                            <CurrencySwitcher />
                        </div>
                        <p 
                            className='text-center text-[11px] font-medium mt-3'
                            style={{ color: theme === 'dark' ? '#71717a' : '#94a3b8' }}
                        >
                            © 2026 Shoplex Premium Store
                        </p>
                    </div>
                </div>
            </div>,
            document.body
        )}
        </>
    )
}

export default Navbar
