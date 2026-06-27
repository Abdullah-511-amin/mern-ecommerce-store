import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { MdOutlineLocalShipping } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
    const policy = [
        {
            icon: RiExchangeFundsLine,
            h1: 'Easy Exchange Policy',
            p: 'Exchange Made Easy — Quick, Simple, and Customer-Friendly Process.'
        },
        {
            icon: MdOutlineLocalShipping,
            h1: 'Free Shipping',
            p: 'Free delivery on all orders above Rs 2000. Fast and reliable.'
        },
        {
            icon: BiSupport,
            h1: '24/7 Support',
            p: 'Our support team is always here to help you with any queries.'
        }
    ]

    return (
        <div className='py-20 flex flex-col items-center'>

            {/* ── Section divider ── */}
            <div className='w-[90%] max-w-7xl h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-20' />

            {/* ── Heading ── */}
            <div className='w-full text-center mb-12'>
                <Title text1={'OUR'} text2={'POLICY'} />
                <p className='text-slate-400 text-sm md:text-base px-4 mt-2'>
                    Customer-Friendly Policy — Committed to Your Satisfaction and Safety.
                </p>
            </div>

            {/* ── Policy cards ── */}
            <div className='w-[90%] max-w-5xl flex flex-col md:flex-row justify-center items-stretch gap-5'>
                {policy.map((data, index) => {
                    const Icon = data.icon
                    return (
                        <div
                            key={index}
                            className='flex-1 flex flex-col items-center text-center gap-4 p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/30 hover:bg-violet-500/[0.04] transition-all duration-300 group'
                        >
                            {/* Icon circle */}
                            <div className='w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all duration-300'>
                                <Icon className='text-2xl text-violet-400 group-hover:scale-110 transition-transform duration-300' />
                            </div>

                            <h1 className='text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-200'>
                                {data.h1}
                            </h1>
                            <p className='text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-200'>
                                {data.p}
                            </p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default OurPolicy