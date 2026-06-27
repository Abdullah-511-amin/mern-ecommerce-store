import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Addhn from './Addhn'

function Home() {
    return (
        <div className='w-full min-h-screen bg-[#080c18] overflow-hidden relative'>

            {/* ── Background blobs ── */}
            <div className='pointer-events-none fixed inset-0 overflow-hidden'>
                <div className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-[0.08] blur-[120px] animate-pulse' />
                <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-[0.06] blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-fuchsia-600 opacity-[0.04] blur-[90px] animate-pulse' style={{ animationDelay: '4s' }} />
            </div>

            {/* ── Grid overlay ── */}
            <div
                className='pointer-events-none fixed inset-0 opacity-[0.02]'
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            {/* ── Navbar ── */}
            <Navbar />

            {/* ── Body: Sidebar + Page content ── */}
            <div className='flex h-[calc(100vh-64px)] relative z-10'>
                <Sidebar />
                <div className='flex-1 overflow-y-auto'>
                    <Addhn />
                </div>
            </div>

        </div>
    )
}

export default Home