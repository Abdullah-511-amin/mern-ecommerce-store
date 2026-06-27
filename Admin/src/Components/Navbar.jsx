import React, { useContext } from 'react'
import vcart from '../assets/vcart logo.png'
import { AdminDataContext } from '../Context/UserContext'
import axios from 'axios'
import { AuthDataContext } from '../Context/AuthContext'

function Navbar() {
    const { admindata, setadmindata } = useContext(AdminDataContext)
    const { serverurl } = useContext(AuthDataContext)

    const handlelogout = async () => {
        try {
            await axios.get(serverurl + '/auth/logout', { withCredentials: true })
            setadmindata(null)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full h-16 flex px-5 md:px-8 justify-between items-center bg-[#080c18]/80 backdrop-blur-md border-b border-white/[0.06] relative z-50'>

            {/* top glow line */}
            <div className='absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent' />

            {/* ── Logo ── */}
            <div className='flex items-center gap-2.5'>
                <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30'>
                    <img src={vcart} alt="OneCart" className='h-4 w-4 object-contain' />
                </div>
                <div>
                    <p className='text-white font-semibold text-[15px] leading-none tracking-tight'>OneCart</p>
                    <p className='text-violet-400 text-[9px] font-semibold tracking-widest uppercase leading-none mt-0.5'>ADMIN PANEL</p>
                </div>
            </div>

            {/* ── Right side ── */}
            <div className='flex items-center gap-4'>

                {/* Admin badge */}
                {admindata && (
                    <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20'>
                        <div className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                        <span className='text-violet-300 text-xs font-medium'>
                            {admindata?.username || 'Admin'}
                        </span>
                    </div>
                )}

                {/* Logout button */}
                <button
                    onClick={handlelogout}
                    className='flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-sm font-medium hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-200 cursor-pointer'
                >
                    <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                    </svg>
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Navbar