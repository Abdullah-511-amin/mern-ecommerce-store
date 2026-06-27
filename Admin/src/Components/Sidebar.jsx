import React from 'react'
import { FiPlusCircle } from "react-icons/fi"
import { LiaClipboardListSolid } from "react-icons/lia"
import { IoMdCheckboxOutline } from "react-icons/io"
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
    const location = useLocation()

    const navItems = [
        { to: '/add',    icon: FiPlusCircle,           label: 'Add Items'   },
        { to: '/lists',  icon: LiaClipboardListSolid,  label: 'List Items'  },
        { to: '/orders', icon: IoMdCheckboxOutline,     label: 'View Orders' },
    ]

    return (
        <div className='w-16 md:w-56 min-h-screen border-r border-white/[0.06] bg-[#080c18]/80 backdrop-blur-sm flex flex-col items-center py-8 shrink-0 relative'>

            {/* top glow line */}
            <div className='absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent' />

            {/* Logo area */}
            <div className='hidden md:flex items-center gap-2 mb-10 px-4 w-full'>
                <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0'>
                    <span className='text-white font-bold text-sm'>O</span>
                </div>
                <div>
                    <p className='text-white font-bold text-sm leading-none'>OneCart</p>
                    <p className='text-violet-400 text-[9px] font-semibold tracking-widest uppercase mt-0.5'>ADMIN</p>
                </div>
            </div>

            {/* Mobile logo */}
            <div className='md:hidden mb-8'>
                <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30'>
                    <span className='text-white font-bold text-sm'>O</span>
                </div>
            </div>

            {/* Nav label */}
            <p className='hidden md:block text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-4 w-full mb-3'>
                Navigation
            </p>

            {/* Nav items */}
            <div className='flex flex-col gap-2 w-full px-3'>
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = location.pathname === to
                    return (
                        <Link key={to} to={to} className='w-full'>
                            <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group
                                ${isActive
                                    ? 'bg-violet-600/20 border border-violet-500/30 shadow-lg shadow-violet-500/10'
                                    : 'border border-transparent hover:bg-white/[0.04] hover:border-white/[0.08]'
                                }`}
                            >
                                <Icon className={`text-xl shrink-0 transition-colors duration-200
                                    ${isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-300'}`}
                                />
                                <span className={`hidden md:block text-sm font-medium transition-colors duration-200
                                    ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}
                                >
                                    {label}
                                </span>

                                {/* Active indicator */}
                                {isActive && (
                                    <div className='hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-violet-400' />
                                )}
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Bottom divider */}
            <div className='mt-auto w-full px-3'>
                <div className='h-px w-full bg-white/[0.06] mb-4' />
                <div className='flex items-center gap-3 px-3 py-2'>
                    <div className='w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0'>
                        <span className='text-violet-400 text-xs font-bold'>A</span>
                    </div>
                    <div className='hidden md:block'>
                        <p className='text-white text-xs font-medium leading-none'>Admin</p>
                        <p className='text-slate-600 text-[10px] mt-0.5'>Super User</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar