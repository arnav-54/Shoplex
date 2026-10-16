import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft, Loader2, ShieldCheck, Check, Sparkles } from 'lucide-react';

const ResetPassword = () => {
    const { token } = useParams()
    const { navigate, backendUrl } = useContext(ShopContext)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Password strength evaluator
    const getStrength = (pass) => {
        if (!pass) return { score: 0, label: '', color: 'bg-neutral-200' };
        let score = 0;
        if (pass.length >= 6) score++;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
        if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
        return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
    };

    const strength = getStrength(password);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return
        }

        setIsLoading(true);

        try {
            const response = await axios.post(backendUrl + '/api/user/reset-password', {
                token,
                password
            })

            if (response.data.success) {
                setIsSuccess(true);
                toast.success('Password updated successfully!')
                setTimeout(() => {
                    navigate('/login')
                }, 2200)
            } else {
                toast.error(response.data.message || 'Failed to reset password')
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Network error. Please try again.')
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='py-8 sm:py-16 px-4 flex items-center justify-center min-h-[75vh]'>
            <div className='w-full max-w-4xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 animate-fade-in-up'>
                
                {/* Modern Side UI: Password Quality & Security Guarantee */}
                <div className='lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden'>
                    <div className='absolute -top-16 -left-16 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute -bottom-16 -right-16 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none' />

                    {/* Top Content */}
                    <div className='relative z-10'>
                        <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-widest uppercase text-emerald-300 mb-6'>
                            <ShieldCheck size={14} className='text-emerald-400' />
                            <span>Step 3 of 3 • Final Step</span>
                        </div>

                        <h3 className='font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3'>
                            Create your new password.
                        </h3>
                        <p className='text-xs sm:text-sm text-slate-300 leading-relaxed mb-8'>
                            Ensure your account remains bulletproof by choosing a distinctive password.
                        </p>

                        {/* Best Practices Checklist */}
                        <div className='space-y-3.5 bg-white/5 border border-white/10 rounded-2xl p-5'>
                            <p className='text-xs font-bold text-white uppercase tracking-wider mb-2'>
                                Security Checklist:
                            </p>
                            <div className='flex items-center gap-2.5 text-xs'>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                    password.length >= 6 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'
                                }`}>
                                    <Check size={11} />
                                </div>
                                <span className={password.length >= 6 ? 'text-white' : 'text-slate-400'}>
                                    At least 6 characters
                                </span>
                            </div>

                            <div className='flex items-center gap-2.5 text-xs'>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                    /[0-9]/.test(password) ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'
                                }`}>
                                    <Check size={11} />
                                </div>
                                <span className={/[0-9]/.test(password) ? 'text-white' : 'text-slate-400'}>
                                    Includes a number
                                </span>
                            </div>

                            <div className='flex items-center gap-2.5 text-xs'>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                    password && password === confirmPassword ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'
                                }`}>
                                    <Check size={11} />
                                </div>
                                <span className={password && password === confirmPassword ? 'text-white' : 'text-slate-400'}>
                                    Passwords match exactly
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className='relative z-10 pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400'>
                        <span className='flex items-center gap-1.5'>
                            <Lock size={12} className='text-emerald-400' />
                            Bcrypt Hashed & Salted
                        </span>
                        <span>Zero-Trace</span>
                    </div>
                </div>

                {/* Form Column (lg:col-span-7) */}
                <div className='lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center'>
                    {!isSuccess ? (
                        <form onSubmit={onSubmitHandler} className='space-y-6'>
                            <div>
                                <div className='w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20 shadow-xs'>
                                    <Lock size={22} />
                                </div>
                                <h2 className='font-heading text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-2'>
                                    Set New Password
                                </h2>
                                <p className='text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed'>
                                    Please enter and confirm your new credentials to finalize your reset.
                                </p>
                            </div>

                            {/* New Password */}
                            <div className='space-y-2'>
                                <label className='block text-xs font-bold uppercase tracking-wider text-[var(--ink)]'>
                                    New Password
                                </label>
                                <div className='relative'>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type={showPassword ? 'text' : 'password'}
                                        className='w-full px-4 py-3.5 pr-11 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--ink)] placeholder-[var(--ink-muted)] outline-none focus:border-[var(--ink)] focus:bg-[var(--surface)] transition-all'
                                        placeholder='Enter at least 6 characters'
                                        required
                                        autoFocus
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors'
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {/* Password Strength Meter */}
                                {password && (
                                    <div className='pt-1 space-y-1 animate-fade-in'>
                                        <div className='flex items-center justify-between text-[11px]'>
                                            <span className='text-[var(--ink-muted)]'>Security rating:</span>
                                            <span className='font-bold text-[var(--ink)]'>{strength.label}</span>
                                        </div>
                                        <div className='h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden flex gap-1'>
                                            <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength.score >= 1 ? strength.color : 'bg-transparent'}`} />
                                            <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength.score >= 2 ? strength.color : 'bg-transparent'}`} />
                                            <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength.score >= 3 ? strength.color : 'bg-transparent'}`} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className='space-y-2'>
                                <label className='block text-xs font-bold uppercase tracking-wider text-[var(--ink)]'>
                                    Confirm New Password
                                </label>
                                <div className='relative'>
                                    <input
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className='w-full px-4 py-3.5 pr-11 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--ink)] placeholder-[var(--ink-muted)] outline-none focus:border-[var(--ink)] focus:bg-[var(--surface)] transition-all'
                                        placeholder='Re-type your password'
                                        required
                                    />
                                    <button
                                        type='button'
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className='absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors'
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className='text-xs text-rose-500 font-medium'>Passwords do not match yet.</p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type='submit'
                                disabled={isLoading || password.length < 6 || password !== confirmPassword}
                                className='btn-primary w-full py-3.5 text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-60 shadow-md'
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className='w-4 h-4 animate-spin' />
                                        <span>Securing Credentials...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={16} />
                                        <span>Update Password</span>
                                    </>
                                )}
                            </button>

                            <div className='pt-2 text-center'>
                                <button
                                    type='button'
                                    onClick={() => navigate('/login')}
                                    className='inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors'
                                >
                                    <ArrowLeft size={14} />
                                    <span>Back to Sign In</span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className='text-left space-y-6 animate-fade-in-up'>
                            <div className='w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shadow-sm'>
                                <CheckCircle2 size={28} />
                            </div>

                            <div>
                                <h2 className='font-heading text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-2 tracking-tight'>
                                    Password Successfully Reset!
                                </h2>
                                <p className='text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed'>
                                    Your password has been updated securely in the database. Redirecting you to sign in...
                                </p>
                            </div>

                            <button
                                onClick={() => navigate('/login')}
                                className='btn-primary w-full py-3.5 text-sm font-bold tracking-wider uppercase'
                            >
                                Sign In Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
