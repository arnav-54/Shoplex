import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CheckCircle2, Loader2, ShieldCheck, ShoppingBag, PackageCheck } from 'lucide-react'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, logout, cartItems, setCartItems, getCartAmount, delivery_fee, products, currency } = useContext(ShopContext);

    // Instant Feedback & Success Modal States
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: 'India',
        phone: ''
    })

    const [hasSavedAddress, setHasSavedAddress] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error('Please login to place an order');
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            // 1. Check local saved address
            const saved = localStorage.getItem('shoplex_saved_address');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setFormData(prev => ({ ...prev, ...parsed, country: parsed.country || 'India' }));
                    setHasSavedAddress(true);
                } catch (e) {}
            }

            // 2. Fetch fresh user profile from backend
            try {
                const res = await axios.post(backendUrl + '/api/user/profile', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success && res.data.user) {
                    const { name, email } = res.data.user;
                    const nameParts = (name || '').trim().split(' ');
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(' ') || '';
                    setFormData(prev => ({
                        ...prev,
                        firstName: prev.firstName || firstName,
                        lastName: prev.lastName || lastName,
                        email: prev.email || email,
                        country: prev.country || 'India'
                    }));
                }
            } catch (err) {
                console.log('Error fetching user profile:', err);
            }
        };

        fetchUserData();
    }, [token]);

    // Coupon state
    const [couponCode, setCouponCode] = useState('FIRST20')
    const [couponApplied, setCouponApplied] = useState(null) // { code, discountPercent }
    const [couponLoading, setCouponLoading] = useState(false)

    const onChangeHandler = (event) => {
        const name = event.target.name
        let value = event.target.value

        if (name === 'phone') {
            value = value.replace(/\D/g, '').slice(0, 10);
        } else if (name === 'zipcode') {
            value = value.replace(/\D/g, '').slice(0, 6);
        }

        setFormData(data => ({ ...data, [name]: value }))
    }

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            toast.error('Please enter a coupon code');
            return;
        }

        setCouponLoading(true);
        try {
            const response = await axios.post(
                backendUrl + '/api/coupon/validate',
                { code: couponCode, orderAmount: getCartAmount() },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setCouponApplied(response.data.coupon);
                toast.success(`Coupon applied! ${response.data.coupon.discountPercent}% off`);
            } else {
                toast.error(response.data.message);
                setCouponApplied(null);
            }
        } catch (error) {
            toast.error('Failed to validate coupon');
            setCouponApplied(null);
        } finally {
            setCouponLoading(false);
        }
    }

    const removeCoupon = () => {
        setCouponApplied(null);
        setCouponCode('');
        toast.info('Coupon removed');
    }

    const getDiscountAmount = () => {
        if (!couponApplied) return 0;
        return Math.round((getCartAmount() * couponApplied.discountPercent) / 100);
    }

    const getFinalAmount = () => {
        const subtotal = getCartAmount();
        const discount = getDiscountAmount();
        const effectiveDeliveryFee = subtotal >= 999 ? 0 : delivery_fee;
        return Math.max(0, subtotal - discount + effectiveDeliveryFee);
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const initPay = async (order, backendKey) => {
        try {
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded || !window.Razorpay) {
                setIsPlacingOrder(false);
                toast.error('Payment gateway SDK could not be loaded. Please disable any ad-blockers and refresh.');
                return;
            }

            const razorpayKey = backendKey || order?.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_Ttmj5TDvb0ZPVz';

            const options = {
                key: razorpayKey,
                amount: order.amount,
                currency: order.currency || 'INR',
                name: 'Shoplex Store',
                description: 'Payment for your order',
                order_id: order.id,
                receipt: order.receipt,
                prefill: {
                    name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
                    email: formData.email || '',
                    contact: formData.phone || ''
                },
                theme: {
                    color: '#e85d4a'
                },
                modal: {
                    ondismiss: () => {
                        setIsPlacingOrder(false);
                    }
                },
                handler: async (response) => {
                    setIsPlacingOrder(true);
                    setProcessingMessage('Verifying payment confirmation...');
                    try {
                        const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { Authorization: `Bearer ${token}` } });
                        setIsPlacingOrder(false);
                        if (data.success) {
                            setCartItems({});
                            setOrderSuccess({
                                orderId: order.id || `ORD-${Date.now().toString().slice(-6)}`,
                                amount: getFinalAmount(),
                                paymentMethod: 'Razorpay Online',
                                address: formData
                            });
                        } else {
                            toast.error(data.message || 'Payment verification failed');
                        }
                    } catch (error) {
                        setIsPlacingOrder(false);
                        console.error('Verify payment error:', error);
                        toast.error(error.message || 'Payment verification failed');
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (resp) {
                setIsPlacingOrder(false);
                toast.error(resp.error?.description || 'Payment failed or declined');
            });
            rzp.open();
            setIsPlacingOrder(false);
        } catch (err) {
            setIsPlacingOrder(false);
            console.error('Razorpay init error:', err);
            toast.error(err.message || 'Could not launch payment gateway');
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (!formData.zipcode || formData.zipcode.toString().trim().length !== 6) {
                toast.error('Please enter a valid 6-digit delivery pincode / zipcode');
                return;
            }

            if (!formData.phone || formData.phone.toString().trim().length !== 10) {
                toast.error('Please enter a valid 10-digit mobile number');
                return;
            }

            // Save address for future orders
            try {
                localStorage.setItem('shoplex_saved_address', JSON.stringify(formData));
            } catch (e) {}

            let orderItems = []
            const productMap = new Map(products.map(p => [p._id, p]));

            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        const product = productMap.get(itemId);
                        if (product) {
                            const itemInfo = structuredClone(product)
                            itemInfo.size = size
                            itemInfo.quantity = cartItems[itemId][size]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                toast.error('Your cart is empty');
                return;
            }

            // Immediately show processing overlay
            setIsPlacingOrder(true);
            if (method === 'razorpay') {
                setProcessingMessage('Connecting to secure Razorpay gateway...');
            } else if (method === 'stripe') {
                setProcessingMessage('Redirecting to secure Stripe checkout...');
            } else {
                setProcessingMessage('Confirming your order details...');
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getFinalAmount(),
                couponCode: couponApplied ? couponApplied.code : null
            }

            switch (method) {
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    setIsPlacingOrder(false);
                    if (response.data.success) {
                        setCartItems({});
                        setOrderSuccess({
                            orderId: response.data.orderId || `ORD-${Date.now().toString().slice(-6)}`,
                            amount: getFinalAmount(),
                            paymentMethod: 'Cash on Delivery',
                            address: formData
                        });
                    } else {
                        if (response.data.message === 'Invalid token' || response.data.message === 'Not Authorized Login Again') {
                            logout();
                            toast.error('Session expired. Please login again');
                            navigate('/login');
                        } else {
                            toast.error(response.data.message)
                        }
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        setIsPlacingOrder(false);
                        if (responseStripe.data.message === 'Invalid token' || responseStripe.data.message === 'Not Authorized Login Again') {
                            logout();
                            toast.error('Session expired. Please login again');
                            navigate('/login');
                        } else {
                            toast.error(responseStripe.data.message)
                        }
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { Authorization: `Bearer ${token}` } })
                    if (responseRazorpay.data.success) {
                        await initPay(responseRazorpay.data.order, responseRazorpay.data.key_id);
                    } else {
                        setIsPlacingOrder(false);
                        if (responseRazorpay.data.message === 'Invalid token' || responseRazorpay.data.message === 'Not Authorized Login Again') {
                            logout();
                            toast.error('Session expired. Please login again');
                            navigate('/login');
                        } else {
                            toast.error(responseRazorpay.data.message)
                        }
                    }
                    break;

                default:
                    setIsPlacingOrder(false);
                    break;
            }

        } catch (error) {
            setIsPlacingOrder(false);
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='flex items-center justify-between my-3'>
                    <div className='text-xl sm:text-2xl'>
                        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                    </div>
                    {hasSavedAddress && (
                        <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300'>
                            <CheckCircle2 size={12} />
                            <span>Saved Address Loaded</span>
                        </span>
                    )}
                </div>

                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded-lg py-2.5 px-3.5 w-full text-sm font-medium focus:outline-none focus:border-[var(--ink)]' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded-lg py-2.5 px-3.5 w-full text-sm font-medium focus:outline-none focus:border-[var(--ink)]' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded-lg py-2.5 px-3.5 w-full text-sm font-medium focus:outline-none focus:border-[var(--ink)]' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded-lg py-2.5 px-3.5 w-full text-sm font-medium focus:outline-none focus:border-[var(--ink)]' type="text" placeholder='Street Address / Flat / Landmark' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded-lg py-2.5 px-3.5 w-full text-sm font-medium focus:outline-none focus:border-[var(--ink)]' type="text" placeholder='City' />
                    <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded-lg py-2.5 px-3.5 w-full text-sm font-medium focus:outline-none focus:border-[var(--ink)]' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <div className='w-full'>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded-lg py-2.5 px-3.5 w-full text-sm font-medium focus:outline-none focus:border-[var(--ink)]' type="text" maxLength={6} placeholder='6-Digit Pincode' />
                        {formData.zipcode && (
                            <div className='mt-1 text-xs'>
                                {formData.zipcode.toString().trim().length === 6 ? (
                                    <p className='text-emerald-600 font-semibold flex items-center gap-1 text-[11px]'>
                                        <CheckCircle2 size={12} />
                                        <span>Verified: Express delivery & COD available</span>
                                    </p>
                                ) : (
                                    <p className='text-amber-600 text-[11px]'>
                                        {6 - formData.zipcode.length} more digit{6 - formData.zipcode.length > 1 ? 's' : ''} needed for serviceability check
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='w-full'>
                        <select
                            name='country'
                            value={formData.country || 'India'}
                            onChange={onChangeHandler}
                            className='border border-gray-300 rounded-lg py-2.5 px-3 w-full text-sm font-medium bg-white dark:bg-neutral-900 focus:outline-none focus:border-[var(--ink)] cursor-pointer'
                            required
                        >
                            <option value="India">🇮🇳 India</option>
                            <option value="United States">🇺🇸 United States</option>
                            <option value="United Kingdom">🇬🇧 United Kingdom</option>
                            <option value="Canada">🇨🇦 Canada</option>
                            <option value="Australia">🇦🇺 Australia</option>
                            <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                            <option value="Germany">🇩🇪 Germany</option>
                            <option value="Singapore">🇸🇬 Singapore</option>
                        </select>
                    </div>
                </div>

                {/* 10-Digit Mobile Phone with +91 badge and live validation */}
                <div className='w-full'>
                    <div className='relative'>
                        <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 select-none'>
                            +91
                        </span>
                        <input
                            required
                            onChange={onChangeHandler}
                            name='phone'
                            value={formData.phone}
                            className='border border-gray-300 rounded-lg py-2.5 pl-12 pr-4 w-full text-sm font-medium focus:outline-none focus:border-[var(--ink)]'
                            type="tel"
                            maxLength={10}
                            placeholder='10-digit mobile number'
                        />
                    </div>
                    {formData.phone && (
                        <div className='mt-1 text-xs'>
                            {formData.phone.length === 10 ? (
                                <p className='text-emerald-600 font-semibold flex items-center gap-1 text-[11px]'>
                                    <CheckCircle2 size={12} />
                                    <span>Verified 10-digit mobile number</span>
                                </p>
                            ) : (
                                <p className='text-amber-600 text-[11px]'>
                                    {10 - formData.phone.length} more digit{10 - formData.phone.length > 1 ? 's' : ''} needed (10-digit Indian phone)
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>


            <div className='mt-8'>

                <div className='mt-8 w-full'>
                    <CartTotal discount={getDiscountAmount()} couponCode={couponApplied?.code} />
                </div>

                {/* Coupon Code Section */}
                <div className='mt-6 p-4 border border-[var(--border)] rounded-xl bg-[var(--surface-elevated)]'>
                    <p className='text-xs font-bold uppercase tracking-wider text-[var(--ink)] mb-3 flex items-center gap-2'>
                        <svg className='w-4 h-4 text-[var(--accent)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                        </svg>
                        Promo Code
                    </p>

                    {couponApplied ? (
                        <div className='flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3'>
                            <div className='flex items-center gap-2'>
                                <svg className='w-5 h-5 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                <div>
                                    <span className='font-bold text-green-800 text-sm'>{couponApplied.code}</span>
                                    <span className='text-green-600 text-xs ml-2'>({couponApplied.discountPercent}% off)</span>
                                </div>
                            </div>
                            <button
                                type='button'
                                onClick={removeCoupon}
                                className='text-red-500 hover:text-red-700 text-xs font-bold uppercase transition-colors'
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className='flex gap-2'>
                            <input
                                type='text'
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder='Enter coupon code'
                                className='flex-1 border border-gray-300 rounded-lg py-2.5 px-4 text-sm font-medium uppercase tracking-wider focus:outline-none focus:border-[var(--ink)] transition-colors'
                            />
                            <button
                                type='button'
                                onClick={handleApplyCoupon}
                                disabled={couponLoading}
                                className='px-5 py-2.5 bg-[var(--ink)] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[var(--accent)] transition-colors disabled:opacity-50'
                            >
                                {couponLoading ? '...' : 'Apply'}
                            </button>
                        </div>
                    )}
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button
                            type='submit'
                            disabled={isPlacingOrder}
                            className='bg-black text-white px-10 py-3.5 text-sm font-semibold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] ml-auto disabled:opacity-75 disabled:cursor-not-allowed shadow-md hover:shadow-lg'
                        >
                            {isPlacingOrder ? (
                                <>
                                    <Loader2 className='w-4 h-4 animate-spin' />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <span>PLACE ORDER</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Instant Processing Loading Modal / Overlay */}
            {isPlacingOrder && (
                <div className='fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in'>
                    <div className='bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-4 animate-scale-up'>
                        <div className='relative w-16 h-16 mx-auto flex items-center justify-center'>
                            <div className='absolute inset-0 rounded-full border-4 border-gray-200 border-t-black animate-spin'></div>
                            <PackageCheck className='w-7 h-7 text-[var(--ink)] animate-pulse' />
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-[var(--ink)]'>Processing Order</h3>
                            <p className='text-xs text-[var(--ink-soft)] mt-1.5 leading-relaxed'>
                                {processingMessage || 'Securing your order and preparing payment...'}
                            </p>
                        </div>
                        <div className='pt-2 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[var(--ink-muted)] border-t border-[var(--border)]'>
                            <ShieldCheck className='w-4 h-4 text-emerald-600' />
                            <span>256-bit Encrypted Checkout</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Confirmed Celebration Popup Modal */}
            {orderSuccess && (
                <div className='fixed inset-0 z-[130] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in'>
                    <div className='bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center animate-scale-up'>
                        {/* Success Icon */}
                        <div className='w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/30 rounded-full mx-auto flex items-center justify-center shadow-inner'>
                            <CheckCircle2 className='w-11 h-11 text-emerald-600 dark:text-emerald-400' />
                        </div>

                        <div className='space-y-1.5'>
                            <span className='px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider rounded-full'>
                                Order Confirmed
                            </span>
                            <h2 className='text-2xl font-extrabold text-[var(--ink)] pt-1'>Thank You For Your Order!</h2>
                            <p className='text-xs text-[var(--ink-soft)] leading-relaxed max-w-xs mx-auto'>
                                Your order has been placed successfully and is now being packed with care.
                            </p>
                        </div>

                        {/* Order Details Card */}
                        <div className='p-4 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl text-left space-y-2.5 text-xs'>
                            <div className='flex justify-between items-center pb-2 border-b border-[var(--border)]'>
                                <span className='text-[var(--ink-muted)]'>Order ID</span>
                                <span className='font-mono font-bold text-[var(--ink)]'>#{orderSuccess.orderId}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-[var(--ink-muted)]'>Total Amount</span>
                                <span className='font-bold text-[var(--ink)] text-sm'>{currency}{orderSuccess.amount}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-[var(--ink-muted)]'>Payment Method</span>
                                <span className='font-semibold text-[var(--ink)]'>{orderSuccess.paymentMethod}</span>
                            </div>
                            <div className='flex justify-between items-center pt-1 text-[11px] text-[var(--ink-soft)]'>
                                <span>Deliver to:</span>
                                <span className='font-medium text-right truncate max-w-[200px]'>
                                    {orderSuccess.address?.firstName} {orderSuccess.address?.lastName}, {orderSuccess.address?.city}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                            <button
                                type='button'
                                onClick={() => {
                                    setOrderSuccess(null);
                                    navigate('/orders');
                                }}
                                className='flex-1 btn-primary py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl'
                            >
                                <ShoppingBag size={15} /> View My Orders
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setOrderSuccess(null);
                                    navigate('/collection');
                                }}
                                className='flex-1 border border-[var(--border)] hover:bg-[var(--surface-elevated)] text-[var(--ink)] py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors'
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    )
}

export default PlaceOrder
