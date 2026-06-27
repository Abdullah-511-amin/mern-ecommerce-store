import React from 'react'
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setheroCount }) {
  return (
    <div className='w-1/2 h-full flex flex-col justify-center pl-8 md:pl-16 lg:pl-24 relative'>

      {/* ── Badge ── */}
      <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 w-fit animate-[fadeSlideUp_0.5s_ease_both]'>
        <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
        New Season
      </div>

      {/* ── Hero Text ── */}
      <div className='flex flex-col gap-2 animate-[fadeSlideUp_0.6s_ease_both]'>
        <p className='text-[18px] md:text-[36px] lg:text-[50px] font-bold text-white leading-tight tracking-tight'>
          {heroData.text1}
        </p>
        <p className='text-[16px] md:text-[30px] lg:text-[42px] font-bold leading-tight tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
          {heroData.text2}
        </p>
      </div>

      {/* ── CTA Button ── */}
      <button className='mt-8 w-fit px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[2px] active:scale-[0.99] transition-all duration-200 animate-[fadeSlideUp_0.7s_ease_both]'>
        Shop Now →
      </button>

      {/* ── Dots ── */}
      <div className='flex gap-3 mt-10 animate-[fadeSlideUp_0.8s_ease_both]'>
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => setheroCount(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer border-none outline-none
              ${heroCount === i
                ? 'w-8 h-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/40'
                : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
              }`}
          />
        ))}
      </div>

    </div>
  )
}

export default Hero