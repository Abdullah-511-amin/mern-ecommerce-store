import React, { useContext } from 'react'
import vcart from '../assets/vcart logo.png'
import { FaGoogle } from "react-icons/fa6";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { AuthDataContext } from '../Context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utilis/Firebase';
import { UserDataContext } from '../Context/UserContext';
import { ShopDataContext } from '../Context/ShopContext';

function Registration() {

    const [userdata, setuserdata] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const [password, setpassword] = useState(false)
    const [loading, setloading] = useState(false)

    const { serverurl } = useContext(AuthDataContext)
    const { GetCurrentUser } = useContext(UserDataContext)
    const {GetProducts} = useContext(ShopDataContext)

    const handlechange = (e) => {
        const { name, value } = e.target;
        setuserdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        try {
            const res = await axios.post(serverurl + '/auth/registration', userdata, { withCredentials: true })
            GetCurrentUser()
            await GetProducts()
            navigate('/')
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    const googleSignup = async () => {
        try {
            const res = await signInWithPopup(auth, provider)
            let user = res.user
            let name = user.displayName
            let email = user.email
            const result = await axios.post(serverurl + '/auth/googlelogin', { name, email }, { withCredentials: true })
            GetCurrentUser()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='relative min-h-screen w-full overflow-hidden bg-[#080c18] flex flex-col justify-center items-center px-4'>

            {/* ── Animated background blobs ── */}
            <div className='pointer-events-none absolute inset-0 overflow-hidden'>
                <div className='absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.12] blur-[100px] animate-pulse' />
                <div className='absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-cyan-500 opacity-[0.10] blur-[90px] animate-pulse' style={{ animationDelay: '1.5s' }} />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-fuchsia-600 opacity-[0.07] blur-[80px] animate-pulse' style={{ animationDelay: '3s' }} />
            </div>

            {/* ── Subtle grid overlay ── */}
            <div
                className='pointer-events-none absolute inset-0 opacity-[0.03]'
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            {/* ── Logo ── */}
            <div className='absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-2.5 z-10'>
                <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30'>
                    <img src={vcart} alt="OneCart" className='h-5 w-5 object-contain' />
                </div>
                <div>
                    <p className='text-white font-semibold text-[15px] leading-none tracking-tight'>OneCart</p>
                    <p className='text-violet-400 text-[9px] font-semibold tracking-widest uppercase leading-none mt-0.5'>STORE</p>
                </div>
            </div>

            {/* ── Heading ── */}
            <div className='relative z-10 text-center mb-7 animate-[fadeSlideUp_0.6s_ease_both]'>
                <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>
                    <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
                    New Account
                </div>
                <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight'>
                    Welcome to{' '}
                    <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                        OneCart
                    </span>
                </h1>
                <p className='text-slate-400 text-sm mt-2 font-normal'>Create your account and start shopping</p>
            </div>

            {/* ── Card ── */}
            <div className='relative z-10 w-full max-w-md animate-[fadeSlideUp_0.7s_ease_0.1s_both]'>
                <div className='relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 md:p-8 shadow-2xl shadow-black/40 backdrop-blur-sm overflow-hidden'>

                    {/* top glow line */}
                    <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent' />

                    {/* ── Google button ── */}
                    <button
                        onClick={googleSignup}
                        className='w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.09] hover:border-white/[0.2] hover:-translate-y-[1px] active:scale-[0.99] transition-all duration-200 group cursor-pointer'
                    >
                        <FaGoogle className='text-[17px] text-[#4285F4] group-hover:scale-110 transition-transform duration-200' />
                        <span>Continue with Google</span>
                    </button>

                    {/* ── Divider ── */}
                    <div className='flex items-center gap-3 my-5'>
                        <div className='flex-1 h-px bg-white/[0.07]' />
                        <span className='text-slate-500 text-xs font-medium'>or register with email</span>
                        <div className='flex-1 h-px bg-white/[0.07]' />
                    </div>

                    {/* ── Form ── */}
                    <form className='flex flex-col gap-4' onSubmit={handlesubmit}>

                        {/* Name */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Full name</label>
                            <input
                                type="text"
                                placeholder='Muhammad Ali'
                                name='username'
                                onChange={handlechange}
                                className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.06] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15]'
                            />
                        </div>

                        {/* Email */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Email address</label>
                            <input
                                type="email"
                                placeholder='you@example.com'
                                name='email'
                                onChange={handlechange}
                                className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.06] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15]'
                            />
                        </div>

                        {/* Password */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Password</label>
                            <div className='relative'>
                                <input
                                    type={password ? 'text' : 'password'}
                                    name='password'
                                    onChange={handlechange}
                                    placeholder="Min. 8 characters"
                                    className='w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.06] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15]'
                                />
                                <button
                                    type='button'
                                    className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors duration-200 p-0.5 cursor-pointer'
                                    onClick={() => setpassword((prev) => !prev)}
                                >
                                    {password
                                        ? <IoEyeOffOutline className='text-xl' />
                                        : <IoEyeOutline className='text-xl' />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full mt-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[1px] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer flex items-center justify-center gap-2'
                        >
                            {loading && (
                                <svg className='animate-spin h-4 w-4 text-white/80' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {loading ? 'Creating account...' : 'Create Account →'}
                        </button>

                    </form>

                    {/* Terms */}
                    <p className='text-center text-slate-600 text-[11px] mt-4 leading-relaxed'>
                        By registering you agree to our{' '}
                        <span className='text-violet-400 hover:text-violet-300 cursor-pointer transition-colors'>Terms</span>
                        {' '}and{' '}
                        <span className='text-violet-400 hover:text-violet-300 cursor-pointer transition-colors'>Privacy Policy</span>
                    </p>
                </div>

                {/* Login link */}
                <p className='text-center text-slate-500 text-sm mt-5'>
                    Already have an account?{' '}
                    <Link to='/login'>
                        <span className='text-violet-400 hover:text-violet-300 font-medium cursor-pointer transition-colors duration-200'>
                            Sign in
                        </span>
                    </Link>
                </p>
            </div>

        </div>
    )
}

export default Registration