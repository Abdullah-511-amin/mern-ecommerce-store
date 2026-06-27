import React from 'react'
import girl from '../assets/girl.webp'

function Background({ heroCount }) {

  const images = [girl]

  return (
    <div className='w-1/2 h-full relative overflow-hidden'>

      {/* ── Left fade into dark bg ── */}
      <div className='absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080c18] to-transparent z-10 pointer-events-none' />

      {/* ── Bottom fade ── */}
      <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080c18] to-transparent z-10 pointer-events-none' />

      {/* ── Top fade ── */}
      <div className='absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#080c18] to-transparent z-10 pointer-events-none' />

      {/* ── Violet tint overlay ── */}
      <div className='absolute inset-0 bg-violet-950/20 z-[5] pointer-events-none' />

      {/* ── Image ── */}
      <img
        src={images[heroCount] || images[0]}
        className='w-full h-full object-cover transition-opacity duration-700'
        alt="hero"
      />

    </div>
  )
}

export default Background