import React from 'react'
import vcart from '../assets/vcart logo.png'
import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

function Footer() {
    return (
        <footer className='w-full bg-[#080c18] relative overflow-hidden'>

            {/* ── Top glow line ── */}
            <div className='w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent' />

            {/* ── Blob ── */}
            <div className='pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-violet-700 opacity-[0.06] blur-[80px]' />

            <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-14 pb-8'>

                {/* ── Main grid ── */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12'>

                    {/* ── Brand col ── */}
                    <div className='lg:col-span-1'>
                        <div className='flex items-center gap-2.5 mb-4'>
                            <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-500/30'>
                                <img src={vcart} alt="OneCart" className='h-5 w-5 object-contain' />
                            </div>
                            <div>
                                <p className='text-white font-bold text-[15px] leading-none tracking-tight'>OneCart</p>
                                <p className='text-violet-400 text-[9px] font-semibold tracking-widest uppercase leading-none mt-0.5'>STORE</p>
                            </div>
                        </div>
                        <p className='text-slate-500 text-sm leading-relaxed mb-5'>
                            Pakistan's premium fashion destination. Quality clothing for Men, Women & Kids — delivered to your door.
                        </p>

                        {/* Social icons */}
                        <div className='flex items-center gap-3'>
                            {[
                                { icon: FaInstagram, href: '#' },
                                { icon: FaFacebookF, href: '#' },
                                { icon: FaTwitter,   href: '#' },
                                { icon: FaYoutube,   href: '#' },
                            ].map(({ icon: Icon, href }, i) => (
                                <a key={i} href={href}
                                    className='w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-500 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/[0.08] transition-all duration-200'>
                                    <Icon className='text-sm' />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Quick Links ── */}
                    <div>
                        <h3 className='text-white text-xs font-semibold uppercase tracking-widest mb-5'>Quick Links</h3>
                        <ul className='flex flex-col gap-3'>
                            {[
                                { label: 'Home',        to: '/' },
                                { label: 'Collections', to: '/collections' },
                                { label: 'Best Sellers',to: '/' },
                                { label: 'About Us',    to: '/about' },
                                { label: 'Contact',     to: '/contact' },
                            ].map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className='text-slate-500 text-sm hover:text-violet-400 transition-colors duration-200 flex items-center gap-2 group'>
                                        <span className='w-1 h-1 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Categories ── */}
                    <div>
                        <h3 className='text-white text-xs font-semibold uppercase tracking-widest mb-5'>Categories</h3>
                        <ul className='flex flex-col gap-3'>
                            {['Men', 'Women', 'Kids', 'Top Wear', 'Bottom Wear', 'Winter Wear'].map((item) => (
                                <li key={item}>
                                    <Link to='/collections' className='text-slate-500 text-sm hover:text-violet-400 transition-colors duration-200 flex items-center gap-2 group'>
                                        <span className='w-1 h-1 rounded-full bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Contact ── */}
                    <div>
                        <h3 className='text-white text-xs font-semibold uppercase tracking-widest mb-5'>Contact Us</h3>
                        <ul className='flex flex-col gap-4'>
                            <li className='flex items-start gap-3'>
                                <MdLocationOn className='text-violet-400 text-lg mt-0.5 shrink-0' />
                                <span className='text-slate-500 text-sm leading-relaxed'>Lahore, Punjab, Pakistan</span>
                            </li>
                            <li className='flex items-center gap-3'>
                                <MdPhone className='text-violet-400 text-base shrink-0' />
                                <a href='tel:+923001234567' className='text-slate-500 text-sm hover:text-violet-400 transition-colors duration-200'>+92 300 123 4567</a>
                            </li>
                            <li className='flex items-center gap-3'>
                                <MdEmail className='text-violet-400 text-base shrink-0' />
                                <a href='mailto:support@onecart.pk' className='text-slate-500 text-sm hover:text-violet-400 transition-colors duration-200'>support@onecart.pk</a>
                            </li>
                        </ul>

                        {/* Mini newsletter */}
                        <div className='mt-6'>
                            <p className='text-slate-400 text-xs font-medium mb-2'>Get exclusive deals:</p>
                            <div className='flex gap-2'>
                                <input
                                    type="email"
                                    placeholder='Your email'
                                    className='flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-slate-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200'
                                />
                                <button className='px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0'>
                                    Go
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ── Divider ── */}
                <div className='h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6' />

                {/* ── Bottom bar ── */}
                <div className='flex flex-col sm:flex-row justify-between items-center gap-3'>
                    <p className='text-slate-600 text-xs'>
                        © {new Date().getFullYear()} OneCart. All rights reserved.
                    </p>
                    <div className='flex items-center gap-5'>
                        {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((item) => (
                            <a key={item} href='#' className='text-slate-600 text-xs hover:text-violet-400 transition-colors duration-200'>
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer