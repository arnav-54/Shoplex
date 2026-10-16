import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, Loader2, ShieldCheck, Lock, Sparkles, Check, ExternalLink } from 'lucide-react';

const ForgotPassword = () => {
    const { navigate, backendUrl } = useContext(ShopContext)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [directResetUrl, setDirectResetUrl] = useState('')
    const [copied, setCopied] = useState(false)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!email.trim()) {
            toast.error('Please enter your email address');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(backendUrl + '/api/user/forgot-password', { email: email.trim() })

            if (response.data.success) {
                setEmailSent(true);
                if (response.data.resetUrl) {
                    setDirectResetUrl(response.data.resetUrl);
                }
                toast.success('Password reset link generated!')
            } else {
                toast.error(response.data.message || 'No account found with this email')
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error('Failed to send reset link. Please verify backend is running.')
            }
        } finally {
            setIsLoading(false);
        }
    }

    const copyResetLink = () => {
        if (directResetUrl) {
            navigator.clipboard.writeText(directResetUrl);
            setCopied(true);
            toast.info('Reset link copied to clipboard!');
            setTimeout(() => setCopied(false), 2500);
        }
    }

    return (
        <div className='py-8 sm:py-16 px-4 flex items-center justify-center min-h-[75vh]'>
            <div className='w-full max-w-4xl bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 animate-fade-in-up'>
                
                {/* Modern Side UI: Security Showcase & Recovery Stepper */}
                <div className='lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden'>
                    {/* Ambient Glow Orbs */}
                    <div className='absolute -top-16 -left-16 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none' />
                    <div className='absolute -bottom-16 -right-16 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none' />

                    {/* Top Content */}
                    <div className='relative z-10'>
                        <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold tracking-widest uppercase text-rose-300 mb-6'>
                            <ShieldCheck size={14} className='text-rose-400' />
                            <span>Zero-Trust Security</span>
                        </div>

                        <h3 className='font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3'>
                            Restoring your access with ease.
                        </h3>
                        <p className='text-xs sm:text-sm text-slate-300 leading-relaxed mb-8'>
                            Follow our seamless 3-step cryptographic verification to regain access to your Shoplex account.
                        </p>

                        {/* Step-by-Step Recovery Timeline */}
                        <div className='space-y-4'>
                            <div className='flex items-start gap-3.5'>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                                    emailSent ? 'bg-emerald-500 text-white' : 'bg-rose-500/20 border border-rose-400/40 text-rose-300'
                                }`}>
                                    {emailSent ? <Check size={14} /> : '1'}
                                </div>
                                <div>
                                    <h4 className='text-xs font-bold text-white uppercase tracking-wider'>Request Link</h4>
                                    <p className='text-[11px] text-slate-400'>Submit your registered account email</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3.5'>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                                    emailSent ? 'bg-amber-500/30 border border-amber-400 text-amber-300' : 'bg-white/10 border border-white/15 text-slate-400'
                                }`}>
                                    2
                                </div>
                                <div>
                                    <h4 className='text-xs font-bold text-white uppercase tracking-wider'>Token Verification</h4>
                                    <p className='text-[11px] text-slate-400'>One-time 15-minute signed token dispatched</p>
                                </div>
                            </div>

                            <div className='flex items-start gap-3.5'>
                                <div className='w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0'>
                                    3
                                </div>
                                <div>
                                    <h4 className='text-xs font-bold text-white uppercase tracking-wider'>New Credentials</h4>
                                    <p className='text-[11px] text-slate-400'>Set a strong password with live feedback</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Security Guarantee */}
                    <div className='relative z-10 pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400'>
                        <span className='flex items-center gap-1.5'>
                            <Lock size={12} className='text-emerald-400' />
                            256-bit TLS Encrypted
                        </span>
                        <span>Shoplex Guard™</span>
                    </div>
                </div>

                {/* Form Column (lg:col-span-7) */}
                <div className='lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center'>
                    {!emailSent ? (
                        <form onSubmit={onSubmitHandler} className='space-y-6'>
                            <div>
                                <div className='w-12 h-12 bg-[var(--accent-soft)] text-[var(--accent)] rounded-2xl flex items-center justify-center mb-4 border border-[var(--border)] shadow-xs'>
                                    <KeyRound size={22} />
                                </div>
                                <h2 className='font-heading text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-2'>
                                    Forgot Password?
                                </h2>
                                <p className='text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed'>
                                    No worries! Enter your registered email and we'll dispatch a secure recovery link right away.
                                </p>
                            </div>

                            {/* Email Input */}
                            <div className='space-y-2'>
                                <label className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--ink)]'>
                                    <Mail size={14} className='text-[var(--accent)]' />
                                    Email Address
                                </label>
                                <div className='relative'>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        type="email"
                                        className='w-full px-4 py-3.5 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--ink)] placeholder-[var(--ink-muted)] outline-none focus:border-[var(--ink)] focus:bg-[var(--surface)] transition-all'
                                        placeholder='Enter your account email (e.g. name@example.com)'
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type='submit'
                                disabled={isLoading}
                                className='btn-primary w-full py-3.5 text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-60 shadow-md'
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className='w-4 h-4 animate-spin' />
                                        <span>Dispatching Token...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={16} />
                                        <span>Send Password Reset Link</span>
                                    </>
                                )}
                            </button>

                            {/* Back to Login Link */}
                            <div className='pt-2 flex items-center justify-between text-xs text-[var(--ink-muted)]'>
                                <button
                                    type='button'
                                    onClick={() => navigate('/login')}
                                    className='inline-flex items-center gap-2 font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors'
                                >
                                    <ArrowLeft size={14} />
                                    <span>Back to Sign In</span>
                                </button>
                                <span>Remembered password?</span>
                            </div>
                        </form>
                    ) : (
                        <div className='text-left space-y-6 animate-fade-in-up'>
                            <div className='w-14 h-14 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shadow-sm'>
                                <CheckCircle2 size={28} />
                            </div>

                            <div>
                                <h2 className='font-heading text-2xl sm:text-3xl font-extrabold text-[var(--ink)] mb-2 tracking-tight'>
                                    Check Your Inbox
                                </h2>
                                <p className='text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed'>
                                    We've generated a secure password reset link for <strong className='text-[var(--ink)] font-semibold'>{email}</strong>. It will expire in 15 minutes.
                                </p>
                            </div>

                            {/* Direct Reset Access Badge (Instant Local Dev / Live Testing) */}
                            {directResetUrl && (
                                <div className='p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs space-y-2.5'>
                                    <div className='flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-bold'>
                                        <span className='flex items-center gap-1.5'>
                                            <ShieldCheck size={15} />
                                            Instant Reset Link Ready:
                                        </span>
                                        <button 
                                            onClick={copyResetLink}
                                            className='px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition-colors'
                                        >
                                            {copied ? 'Copied!' : 'Copy Link'}
                                        </button>
                                    </div>
                                    <p className='font-mono text-[11px] text-[var(--ink)] break-all bg-[var(--surface)] p-2.5 rounded-lg border border-[var(--border)]'>
                                        {directResetUrl}
                                    </p>
                                    <a
                                        href={directResetUrl}
                                        className='inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-1'
                                    >
                                        Proceed directly to set new password <ExternalLink size={13} />
                                    </a>
                                </div>
                            )}

                            <div className='space-y-3 pt-2'>
                                <button
                                    onClick={() => navigate('/login')}
                                    className='btn-primary w-full py-3.5 text-sm font-bold tracking-wider uppercase'
                                >
                                    Return to Sign In
                                </button>
                                <button
                                    onClick={() => {
                                        setEmailSent(false)
                                        setEmail('')
                                        setDirectResetUrl('')
                                    }}
                                    className='btn-secondary w-full py-3 text-sm font-semibold'
                                >
                                    Try Another Email
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
