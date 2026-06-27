import React, { useContext, useEffect, useRef, useState } from 'react'
import vcart from '../assets/vcart logo.png'
import { IoSearchOutline } from "react-icons/io5"
import { MdLocalGroceryStore } from "react-icons/md"
import { IoMdHome } from "react-icons/io"
import { BiCategory } from "react-icons/bi"
import { LuContact } from "react-icons/lu"
import { IoCart, IoClose } from "react-icons/io5"
import { IoPersonOutline } from "react-icons/io5"
import { MdOutlineShoppingBag } from "react-icons/md"
import { RiLogoutBoxLine } from "react-icons/ri"
import { UserDataContext } from '../Context/UserContext'
import { ShopDataContext } from '../Context/ShopContext'
import { AuthDataContext } from '../Context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Navbar() {
    const { currentuserdata, setcurrentuserdata } = useContext(UserDataContext)
    const { searchQuery, setsearchQuery, searchActive, setsearchActive } = useContext(ShopDataContext)
    const { serverurl } = useContext(AuthDataContext)

    const [search, setsearch] = useState(false)
    const [dropdownOpen, setdropdownOpen] = useState(false)

    const inputRef = useRef(null)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()

    const categories = [
        { name: "Home", icon: IoMdHome },
        { name: "Collections", icon: BiCategory },
        { name: "About", icon: LuContact },
        { name: "Cart", icon: IoCart }
    ]

    // focus input on search open
    useEffect(() => {
        if (search && inputRef.current) {
            inputRef.current.focus()
        }
    }, [search])

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setdropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearchToggle = () => {
        setsearch((prev) => {
            if (prev) {
                setsearchQuery('')
                setsearchActive(false)
            }
            return !prev
        })
    }

    const handleSearchChange = (e) => {
        const val = e.target.value
        setsearchQuery(val)
        setsearchActive(val.trim().length > 0)
        if (val.trim().length > 0) navigate('/collections')
    }

    const handleClearSearch = () => {
        setsearchQuery('')
        setsearchActive(false)
        inputRef.current?.focus()
    }

    const handleLogout = async () => {
        try {
            await axios.get(serverurl + '/auth/logout', { withCredentials: true })
            setcurrentuserdata(null)
            setdropdownOpen(false)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    const dropdownLinks = [

        {
            icon: MdOutlineShoppingBag,
            label: 'My Orders',
            sub: 'Track your orders',
            to: '/my-orders',
            action: null
        },
        {
            icon: LuContact,
            label: 'About Us',
            sub: 'Learn about OneCart',
            to: '/about',
            action: null
        },
    ]

    return (
        <>
            {/* ── Main Navbar ── */}
            <div className='w-full h-16 bg-[#080c18]/80 backdrop-blur-md border-b border-white/[0.06] flex justify-between items-center px-4 md:px-8 relative z-50'>

                {/* ── Logo ── */}
                <div className='flex items-center gap-2.5'>
                    <div className='w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30'>
                        <img src={vcart} alt="OneCart" className='h-4 w-4 object-contain' />
                    </div>
                    <div>
                        <p className='text-white font-semibold text-[15px] leading-none tracking-tight'>OneCart</p>
                        <p className='text-violet-400 text-[9px] font-semibold tracking-widest uppercase leading-none mt-0.5'>STORE</p>
                    </div>
                </div>

                {/* ── Desktop Nav Links ── */}
                <div className='hidden md:flex items-center gap-1'>
                    {categories.map((data, index) => (
                        <Link key={index} to={data.name === "Home" ? "/" : `/${data.name.toLowerCase()}`}>
                            <button className='flex items-center gap-2 py-2 px-4 rounded-xl text-slate-400 text-sm font-medium hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] transition-all duration-200 cursor-pointer'>
                                <data.icon className='text-base' />
                                {data.name}
                            </button>
                        </Link>
                    ))}
                </div>

                {/* ── Right Side ── */}
                <div className='flex items-center gap-3'>

                    {/* Search toggle */}
                    <button
                        onClick={handleSearchToggle}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer border
                            ${search
                                ? 'bg-violet-600/20 border-violet-500/40 text-violet-400'
                                : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-violet-500/40'
                            }`}
                    >
                        {search ? <IoClose className='text-lg' /> : <IoSearchOutline className='text-lg' />}
                    </button>

                    {/* Cart */}
                    <div className='relative'>
                        <Link to='/cart'>
                            <button className='w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-violet-500/40 transition-all duration-200 cursor-pointer'>
                                <MdLocalGroceryStore className='text-lg' />
                            </button>
                        </Link>
                        <div className='absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/40 pointer-events-none'>
                            <p className='text-[9px] text-white font-bold'>1</p>
                        </div>
                    </div>

                    {/* ── Avatar + Dropdown ── */}
                    <div className='relative' ref={dropdownRef}>
                        <button
                            onClick={() => setdropdownOpen((prev) => !prev)}
                            className='relative focus:outline-none cursor-pointer'
                        >
                            <img
                                src={`https://ui-avatars.com/api/?name=${currentuserdata?.user?.username || 'U'}&background=6d28d9&color=fff`}
                                className={`rounded-xl h-9 w-9 object-cover shadow-lg shadow-violet-500/20 border-2 transition-all duration-200
                                    ${dropdownOpen
                                        ? 'border-violet-400 scale-105'
                                        : 'border-violet-500/40 hover:border-violet-400 hover:scale-105'
                                    }`}
                                alt="avatar"
                            />
                            {/* Online dot */}
                            <div className='absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080c18]' />
                        </button>

                        {/* ── Dropdown Menu ── */}
                        <div className={`absolute right-0 top-12 w-64 transition-all duration-200 origin-top-right
                            ${dropdownOpen
                                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            }`}
                        >
                            <div className='bg-[#0d1526]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden'>

                                {/* top glow */}
                                <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent' />

                                {/* User info header */}
                                <div className='flex items-center gap-3 px-4 py-4 border-b border-white/[0.06]'>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${currentuserdata?.user?.username || 'U'}&background=6d28d9&color=fff`}
                                        className='w-10 h-10 rounded-xl object-cover border border-violet-500/30'
                                        alt="avatar"
                                    />
                                    <div className='min-w-0'>
                                        <p className='text-white text-sm font-semibold truncate'>
                                            {currentuserdata?.user?.username || 'User'}
                                        </p>
                                        <p className='text-slate-500 text-xs truncate'>
                                            {currentuserdata?.user?.email || ''}
                                        </p>
                                    </div>
                                </div>

                                {/* Nav links */}
                                <div className='p-2'>
                                    {dropdownLinks.map(({ icon: Icon, label, sub, to }) => (
                                        <Link
                                            key={label}
                                            to={to}
                                            onClick={() => setdropdownOpen(false)}
                                        >
                                            <div className='flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-violet-500/[0.08] hover:border-violet-500/20 border border-transparent transition-all duration-200 group cursor-pointer'>
                                                <div className='w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:bg-violet-500/10 group-hover:border-violet-500/20 transition-all duration-200'>
                                                    <Icon className='text-sm text-slate-400 group-hover:text-violet-400 transition-colors duration-200' />
                                                </div>
                                                <div className='min-w-0'>
                                                    <p className='text-slate-300 text-xs font-medium group-hover:text-white transition-colors duration-200'>{label}</p>
                                                    <p className='text-slate-600 text-[10px] truncate'>{sub}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className='mx-4 h-px bg-white/[0.06]' />

                                {/* Logout */}
                                <div className='p-2'>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/[0.08] hover:border-red-500/20 border border-transparent transition-all duration-200 group cursor-pointer'
                                    >
                                        <div className='w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all duration-200'>
                                            <RiLogoutBoxLine className='text-sm text-slate-400 group-hover:text-red-400 transition-colors duration-200' />
                                        </div>
                                        <div className='text-left'>
                                            <p className='text-slate-300 text-xs font-medium group-hover:text-red-400 transition-colors duration-200'>Logout</p>
                                            <p className='text-slate-600 text-[10px]'>Sign out of your account</p>
                                        </div>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Search Dropdown ── */}
            <div className={`w-full bg-[#080c18]/95 backdrop-blur-md border-b border-white/[0.06] overflow-hidden transition-all duration-300 z-40 relative ${search ? 'h-16 opacity-100' : 'h-0 opacity-0'}`}>
                <div className='flex items-center justify-center h-full px-4'>
                    <div className='relative w-full max-w-lg'>
                        <IoSearchOutline className='absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-lg pointer-events-none' />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className='w-full bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 py-2.5 pl-10 pr-10 rounded-xl outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200'
                            placeholder='Search products by name, category...'
                        />
                        {searchQuery && (
                            <button onClick={handleClearSearch} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer'>
                                <IoClose className='text-base' />
                            </button>
                        )}
                    </div>
                    {searchActive && (
                        <p className='text-slate-500 text-xs ml-4 whitespace-nowrap'>Searching...</p>
                    )}
                </div>
            </div>

            {/* ── Mobile Bottom Navbar ── */}
            <div className='fixed bottom-0 left-0 w-full md:hidden z-50'>
                <div className='h-px w-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent' />
                <div className='w-full h-16 bg-[#080c18]/95 backdrop-blur-md border-t border-white/[0.06] flex justify-around items-center px-2'>
                    {categories.map((data, index) => {
                        const Icon = data.icon
                        const isActive = data.name === "Home"
                        return (
                            <Link key={index} to={data.name === "Home" ? "/" : `/${data.name.toLowerCase()}`}>
                                <div className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${isActive ? 'text-violet-400' : 'text-slate-500 hover:text-slate-300'}`}>
                                    <Icon className='text-xl' />
                                    <p className='text-[10px] font-medium'>{data.name}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Navbar