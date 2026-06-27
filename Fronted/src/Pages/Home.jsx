import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Background from '../Components/Background'
import Hero from '../Components/Hero'
import LatestCollections from '../Components/LatestCollections'
import BestSeller from '../Components/BestSeller'
import OurPolicy from '../Components/OurPolicy'
import NewLetter from '../Components/NewLetter'
import Footer from '../Components/Footer'

function Home() {

  let heroData = [
    { text1: '30% OFF Limited offer', text2: 'Style That' },
    { text1: 'Discover the Best of Bold Fashion', text2: "Limited Time Only!" },
    { text1: 'Explore Our Best Collection', text2: 'Shop Now' },
    { text1: 'Choose Your Perfect Fashion Fit', text2: "Now On Sale!" }
  ]

  let [heroCount, setheroCount] = useState(0)

  return (
    <div className='w-full min-h-screen bg-[#080c18] relative overflow-hidden'>

      {/* ── Background blobs ── */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-[0.10] blur-[120px] animate-pulse' />
        <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-[0.08] blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-fuchsia-600 opacity-[0.06] blur-[90px] animate-pulse' style={{ animationDelay: '4s' }} />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className='pointer-events-none fixed inset-0 opacity-[0.025]'
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── HERO AREA ── */}
      <div className='flex w-full h-[calc(100vh-64px)] relative z-10'>
        <Hero
          heroCount={heroCount}
          setheroCount={setheroCount}
          heroData={heroData[heroCount]}
        />
        <Background heroCount={heroCount} />
      </div>

      {/* ── SECTIONS ── */}
      <div className='relative z-10'>
        <LatestCollections />
        <BestSeller />
        <OurPolicy />
        <NewLetter />
        <Footer />
      </div>

    </div>
  )
}

export default Home