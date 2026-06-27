import React, { useContext, useState } from 'react'
import vcart from '../assets/vcart logo.png'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { AuthDataContext } from '../Context/AuthContext'
import { AdminDataContext } from '../Context/UserContext'

function Login() {
    const { admindata, GetCurrentAdmin } = useContext(AdminDataContext)

    if (admindata) return <Navigate to="/" replace />

    const [userdata, setuserdata] = useState({ email: '', password: '' })
    const [password, setpassword] = useState(false)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')

    const { serverurl } = useContext(AuthDataContext)

    const handlechange = (e) => {
        const { name, value } = e.target
        setuserdata((prev) => ({ ...prev, [name]: value }))
        seterror('')
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        seterror('')
        try {
            const res = await axios.post(serverurl + '/auth/adminlogin', userdata, { withCredentials: true })
            GetCurrentAdmin()
        } catch (error) {
            seterror('Invalid email or password. Please try again.')
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    return (
        <div className='w-full min-h-screen bg-[#080c18] relative flex flex-col justify-center items-center px-4 overflow-hidden'>

            {/* ── Background blobs ── */}
            <div className='pointer-events-none fixed inset-0 overflow-hidden'>
                <div className='absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.12] blur-[100px] animate-pulse' />
                <div className='absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-cyan-500 opacity-[0.10] blur-[90px] animate-pulse' style={{ animationDelay: '1.5s' }} />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-fuchsia-600 opacity-[0.07] blur-[80px] animate-pulse' style={{ animationDelay: '3s' }} />
            </div>

            {/* ── Grid overlay ── */}
            <div
                className='pointer-events-none fixed inset-0 opacity-[0.025]'
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
                    <p className='text-violet-400 text-[9px] font-semibold tracking-widest uppercase leading-none mt-0.5'>ADMIN</p>
                </div>
            </div>

            {/* ── Heading ── */}
            <div className='relative z-10 text-center mb-7'>
                <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>
                    <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
                    Admin Access
                </div>
                <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight'>
                    Welcome{' '}
                    <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                        Back
                    </span>
                </h1>
                <p className='text-slate-400 text-sm mt-2'>Sign in to access the admin panel</p>
            </div>

            {/* ── Card ── */}
            <div className='relative z-10 w-full max-w-md'>
                <div className='relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 md:p-8 shadow-2xl shadow-black/40 backdrop-blur-sm overflow-hidden'>

                    {/* top glow line */}
                    <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent' />

                    {/* Error message */}
                    {error && (
                        <div className='flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium mb-5'>
                            <svg className='w-4 h-4 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form className='flex flex-col gap-4' onSubmit={handlesubmit}>

                        {/* Email */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Admin Email</label>
                            <input
                                type="email"
                                placeholder='admin@onecart.pk'
                                name='email'
                                onChange={handlechange}
                                required
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
                                    placeholder="Enter your password"
                                    required
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
                            className='w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[1px] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer'
                        >
                            {loading ? (
                                <>
                                    <svg className='animate-spin h-4 w-4 text-white/80' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : 'Sign In →'}
                        </button>

                    </form>
                </div>

                {/* Security note */}
                <p className='text-center text-slate-600 text-xs mt-4'>
                    🔒 This is a restricted admin area. Unauthorized access is prohibited.
                </p>
            </div>

        </div>
    )
}

export default Login