import React, { useContext, useEffect, useState } from 'react'
import { AuthDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { RxCross1 } from "react-icons/rx"
import { BsBoxSeam } from 'react-icons/bs'
import { MdRefresh } from 'react-icons/md'

function Lists() {
  const { serverurl } = useContext(AuthDataContext)
  const [loading, setloading] = useState(false)
  const [deletingId, setdeletingId] = useState(null)
  const [listdata, setlistdata] = useState(null)

  const FetechLists = async () => {
    try {
      const res = await axios.get(serverurl + '/product/all', { withCredentials: true })
      setlistdata(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    FetechLists()
  }, [])

  const handledelete = async (id) => {
    try {
      setdeletingId(id)
      setloading(true)
      const res = await axios.delete(`${serverurl}/product/remove/${id}`, { withCredentials: true })
      // remove from local state without full refetch
      setlistdata((prev) => ({
        ...prev,
        products: prev.products.filter((p) => p._id !== id)
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
      setdeletingId(null)
    }
  }

  const products = listdata?.products || []

  return (
    <div className='flex-1 min-h-screen overflow-y-auto py-10 px-6 md:px-10'>

      {/* ── Page Heading ── */}
      <div className='mb-10'>
        <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>
          <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
          Admin Panel
        </div>
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
              Listed{' '}
              <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                Products
              </span>
            </h1>
            <p className='text-slate-500 text-sm mt-1'>{products.length} products total</p>
          </div>
          <button
            onClick={FetechLists}
            className='flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-sm hover:text-white hover:border-violet-500/30 hover:bg-violet-500/[0.06] transition-all duration-200 cursor-pointer'
          >
            <MdRefresh className='text-lg' />
            Refresh
          </button>
        </div>
        <div className='h-px w-full bg-gradient-to-r from-violet-500/20 via-white/[0.05] to-transparent mt-4' />
      </div>

      {/* ── Empty state ── */}
      {products.length === 0 && (
        <div className='flex flex-col items-center justify-center py-24 gap-4'>
          <div className='w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center'>
            <BsBoxSeam className='text-3xl text-slate-600' />
          </div>
          <p className='text-white font-semibold text-lg'>No products listed yet</p>
          <p className='text-slate-500 text-sm'>Add your first product from the Add Items page.</p>
        </div>
      )}

      {/* ── Product list ── */}
      <div className='flex flex-col gap-4 max-w-3xl'>
        {products.map((data, i) => (
          <div
            key={data._id || i}
            className='w-full bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-4 flex items-center justify-between gap-4 hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-300 group relative overflow-hidden'
          >
            {/* top glow line */}
            <div className='absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent' />

            {/* Left — image + info */}
            <div className='flex items-center gap-4'>
              {/* Image */}
              <div className='w-16 h-16 rounded-xl overflow-hidden border border-white/[0.08] shrink-0 group-hover:border-violet-500/30 transition-colors duration-300'>
                <img
                  src={data?.image1}
                  alt={data?.name}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>

              {/* Info */}
              <div className='flex flex-col gap-1'>
                <h2 className='text-white text-sm font-semibold group-hover:text-violet-200 transition-colors duration-200 leading-tight'>
                  {data?.name}
                </h2>
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='px-2 py-0.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-medium'>
                    {data?.category}
                  </span>
                  {data?.subCategory && (
                    <span className='px-2 py-0.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-400 text-[10px] font-medium'>
                      {data?.subCategory}
                    </span>
                  )}
                  {data?.bestSeller && (
                    <span className='px-2 py-0.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-medium'>
                      ★ Best Seller
                    </span>
                  )}
                </div>
                <p className='text-violet-300 text-sm font-bold mt-0.5'>Rs {data?.price}</p>
              </div>
            </div>

            {/* Right — delete button */}
            <button
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer shrink-0
                                ${deletingId === data._id
                  ? 'bg-red-500/20 border-red-500/30 cursor-not-allowed'
                  : 'bg-white/[0.04] border-white/[0.08] hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 text-slate-500'
                }`}
              disabled={loading}
              onClick={() => handledelete(data._id)}
              title='Delete product'
            >
              {deletingId === data._id ? (
                <svg className='animate-spin h-3.5 w-3.5 text-red-400' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <RxCross1 className='text-sm' />
              )}
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Lists