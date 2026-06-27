import React from 'react'

function Title({ text1, text2 }) {
    return (
        <div className='flex flex-col items-center gap-2 mb-2'>
            <h2 className='text-2xl md:text-4xl font-bold tracking-tight'>
                <span className='text-white/80'>{text1} </span>
                <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                    {text2}
                </span>
            </h2>
            {/* underline accent */}
            <div className='flex items-center gap-2'>
                <div className='w-8 h-px bg-violet-500/40' />
                <div className='w-3 h-3 rounded-full border border-violet-500/50 flex items-center justify-center'>
                    <div className='w-1.5 h-1.5 rounded-full bg-violet-400' />
                </div>
                <div className='w-8 h-px bg-violet-500/40' />
            </div>
        </div>
    )
}

export default Title