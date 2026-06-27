import React from 'react'
import aboutImg from '../assets/girl.webp'
import { RiExchangeFundsLine } from 'react-icons/ri'
import { MdOutlineLocalShipping, MdOutlineVerified } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { Link } from 'react-router-dom'

function About() {

    const stats = [
        { number: '50K+', label: 'Happy Customers' },
        { number: '2K+',  label: 'Products' },
        { number: '5★',   label: 'Avg Rating' },
        { number: '3+',   label: 'Years of Trust' },
    ]

    const values = [
        {
            icon: MdOutlineVerified,
            title: 'Premium Quality',
            desc: 'Every item is carefully sourced and quality-checked before it reaches you. We never compromise on standards.'
        },
        {
            icon: MdOutlineLocalShipping,
            title: 'Fast Delivery',
            desc: 'Swift nationwide delivery across Pakistan. Your order, packed with care and delivered on time.'
        },
        {
            icon: RiExchangeFundsLine,
            title: 'Easy Returns',
            desc: 'Not satisfied? Our hassle-free return and exchange policy has you covered — no questions asked.'
        },
        {
            icon: BiSupport,
            title: '24/7 Support',
            desc: 'Our dedicated support team is always available to help you with orders, sizing, and anything else.'
        },
    ]

    return (
        <div className='w-full min-h-screen bg-[#080c18] relative overflow-hidden'>

            {/* ── Background blobs ── */}
            <div className='pointer-events-none fixed inset-0 overflow-hidden'>
                <div className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-[0.09] blur-[120px] animate-pulse' />
                <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-[0.07] blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />
                <div className='absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-fuchsia-600 opacity-[0.05] blur-[90px] animate-pulse' style={{ animationDelay: '4s' }} />
            </div>

            {/* ── Grid overlay ── */}
            <div
                className='pointer-events-none fixed inset-0 opacity-[0.025]'
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16'>

                {/* ── HERO SECTION — Left text + Right image ── */}
                <div className='flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-24'>

                    {/* LEFT — Text */}
                    <div className='flex-1 flex flex-col'>

                        {/* Badge */}
                        <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 w-fit'>
                            <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
                            Our Story
                        </div>

                        <h1 className='text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6'>
                            Fashion That Speaks{' '}
                            <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                                Your Style
                            </span>
                        </h1>

                        <p className='text-slate-400 text-base leading-relaxed mb-4'>
                            Welcome to <span className='text-violet-300 font-semibold'>OneCart</span> — Pakistan's growing fashion destination built on one simple promise: give every customer access to premium quality clothing at honest prices.
                        </p>
                        <p className='text-slate-500 text-sm leading-relaxed mb-4'>
                            Founded with a passion for style and a commitment to quality, OneCart brings you carefully curated collections for Men, Women, and Kids. From everyday casuals to statement pieces, every product on our platform goes through strict quality checks so you always get the best.
                        </p>
                        <p className='text-slate-500 text-sm leading-relaxed mb-8'>
                            We believe fashion should be accessible, comfortable, and expressive. Whether you're shopping for the latest trends or timeless classics, OneCart is your one stop destination.
                        </p>

                        {/* CTA buttons */}
                        <div className='flex items-center gap-4 flex-wrap'>
                            <Link to='/collections'>
                                <button className='px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[1px] transition-all duration-200 cursor-pointer'>
                                    Shop Now →
                                </button>
                            </Link>
                            <a href='mailto:support@onecart.pk'>
                                <button className='px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-slate-300 font-medium text-sm hover:bg-white/[0.07] hover:border-violet-500/30 hover:text-white transition-all duration-200 cursor-pointer'>
                                    Contact Us
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT — Image */}
                    <div className='flex-1 w-full max-w-md lg:max-w-none relative'>

                        {/* Glow behind image */}
                        <div className='absolute inset-0 bg-violet-600/15 blur-[50px] rounded-3xl -z-10 scale-95' />

                        <div className='relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-violet-900/30'>
                            {/* violet tint */}
                            <div className='absolute inset-0 bg-gradient-to-br from-violet-900/20 to-transparent z-10 pointer-events-none' />
                            {/* bottom fade */}
                            <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080c18]/60 to-transparent z-10 pointer-events-none' />

                            <img
                                src={aboutImg}
                                alt="OneCart Fashion"
                                className='w-full h-[480px] object-cover object-top'
                            />

                            {/* Floating badge on image */}
                            <div className='absolute bottom-5 left-5 z-20 flex items-center gap-3 bg-[#080c18]/80 backdrop-blur-md border border-white/[0.1] rounded-2xl px-4 py-3'>
                                <HiOutlineSparkles className='text-violet-400 text-xl shrink-0' />
                                <div>
                                    <p className='text-white text-xs font-semibold leading-none'>Premium Quality</p>
                                    <p className='text-slate-500 text-[10px] mt-0.5'>Verified & Trusted</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ── STATS ROW ── */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-24'>
                    {stats.map(({ number, label }) => (
                        <div key={label} className='flex flex-col items-center justify-center py-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/25 hover:bg-violet-500/[0.04] transition-all duration-300'>
                            <p className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1'>
                                {number}
                            </p>
                            <p className='text-slate-500 text-xs font-medium uppercase tracking-widest'>{label}</p>
                        </div>
                    ))}
                </div>

                {/* ── SECTION DIVIDER ── */}
                <div className='h-px w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-20' />

                {/* ── WHY CHOOSE US ── */}
                <div className='mb-20'>
                    <div className='text-center mb-12'>
                        <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>
                            Why OneCart
                        </div>
                        <h2 className='text-2xl md:text-4xl font-bold text-white tracking-tight'>
                            Why Choose{' '}
                            <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                                Us?
                            </span>
                        </h2>
                        <p className='text-slate-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed'>
                            We're not just a store — we're a fashion partner committed to your satisfaction at every step.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className='flex flex-col items-start gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/25 hover:bg-violet-500/[0.04] transition-all duration-300 group'>
                                <div className='w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all duration-300'>
                                    <Icon className='text-xl text-violet-400' />
                                </div>
                                <div>
                                    <h3 className='text-white font-semibold text-sm mb-2 group-hover:text-violet-200 transition-colors duration-200'>{title}</h3>
                                    <p className='text-slate-500 text-xs leading-relaxed'>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── MISSION STRIP ── */}
                <div className='relative rounded-2xl overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-r from-violet-900/40 via-fuchsia-900/20 to-cyan-900/20 pointer-events-none' />
                    <div className='absolute inset-0 border border-violet-500/20 rounded-2xl pointer-events-none' />
                    <div className='absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent' />

                    <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-8 md:px-12 py-10'>
                        <div>
                            <p className='text-violet-300 text-xs font-semibold uppercase tracking-widest mb-2'>Our Mission</p>
                            <h3 className='text-white text-xl md:text-2xl font-bold tracking-tight leading-tight'>
                                Making premium fashion{' '}
                                <span className='bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent'>
                                    accessible to everyone
                                </span>
                            </h3>
                            <p className='text-slate-400 text-sm mt-2 max-w-lg leading-relaxed'>
                                From the latest trends to everyday essentials — quality clothing for every budget, every style, every occasion.
                            </p>
                        </div>
                        <Link to='/collections' className='shrink-0'>
                            <button className='px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/30 hover:-translate-y-[1px] transition-all duration-200 cursor-pointer whitespace-nowrap'>
                                Explore Collections →
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About