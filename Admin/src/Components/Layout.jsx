import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <div className='w-full min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] overflow-y-auto'>
      <Navbar />

      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout