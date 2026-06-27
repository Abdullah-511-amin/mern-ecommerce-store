import React from 'react'
import Title from './Title'

function NewLetter() {
    return (
        <div className='py-20 flex flex-col items-center'>

            {/* ── Section divider ── */}
            <div className='w-[90%] max-w-7xl h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-20' />

            {/* ── Newsletter card ── */}
            <div className='w-[90%] max-w-2xl relative'>

                {/* Glow blob behind card */}
                <div className='absolute inset-0 -z-10 bg-violet-600/10 blur-[60px] rounded-full' />

                <div className='relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-10 md:p-14 flex flex-col items-center text-center overflow-hidden'>

                    {/* top glow line */}
                    <div className='absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent' />

                    {/* ── Heading ── */}
                    <div className='w-full mb-3'>
                        <Title text1={'Subscribe Now &'} text2={'Get 20% Off'} />
                    </div>
                    <p className='text-slate-400 text-sm md:text-base px-4 mt-1 mb-8 leading-relaxed'>
                        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
                    </p>

                    {/* ── Input row ── */}
                    <div className='w-full flex flex-col sm:flex-row gap-3'>
                        <input
                            type="email"
                            placeholder='Enter your email address...'
                            className='flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200'
                        />
                        <button className='px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[1px] active:scale-[0.99] transition-all duration-200 whitespace-nowrap cursor-pointer'>
                            Subscribe →
                        </button>
                    </div>

                    <p className='text-slate-600 text-xs mt-4'>No spam. Unsubscribe anytime.</p>

                </div>
            </div>

        </div>
    )
}

export default NewLetter