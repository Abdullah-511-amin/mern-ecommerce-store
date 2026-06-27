import React, { useContext, useState, useEffect } from 'react'
import { AuthDataContext } from '../Context/AuthContext.jsx'
import axios from 'axios'
import { BsBoxSeam } from 'react-icons/bs'
import { MdLocalShipping, MdCheckCircle, MdPending, MdCancel, MdRefresh } from 'react-icons/md'
import { IoPersonOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'

function Orders() {
  const [orderdata, setorderdata] = useState([])
  const [loading, setloading] = useState(true)
  const [updatingId, setupdatingId] = useState(null)
  const { serverurl } = useContext(AuthDataContext)

  const GetOrders = async () => {
    setloading(true)
    try {
      const res = await axios.get(serverurl + '/admin-orders', { withCredentials: true })
      console.log(res.data)
      if (res.data.success) {
        const orders = res.data.orders
        setorderdata(Array.isArray(orders) ? orders : [orders])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    setupdatingId(orderId)
    try {
      await axios.post(serverurl + '/update-order-status',
        { orderId, status: newStatus },
        { withCredentials: true }
      )
      // update locally without refetch
      setorderdata((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (error) {
      console.log(error)
    } finally {
      setupdatingId(null)
    }
  }

  useEffect(() => {
    GetOrders()
  }, [])

  const statusOptions = ['Order Placed', 'Packing', 'Shipped', 'Out for Delivery', 'Delivered']

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      case 'Shipped': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
      case 'Out for Delivery': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      case 'Packing': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'Cancelled': return 'text-red-400 bg-red-500/10 border-red-500/20'
      default: return 'text-violet-400 bg-violet-500/10 border-violet-500/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <MdCheckCircle className='text-emerald-400' />
      case 'Shipped':
      case 'Out for Delivery': return <MdLocalShipping className='text-cyan-400' />
      case 'Cancelled': return <MdCancel className='text-red-400' />
      default: return <MdPending className='text-yellow-400' />
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#080c18] relative overflow-hidden'>

      {/* ── Background blobs ── */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-[0.09] blur-[120px] animate-pulse' />
        <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-[0.07] blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className='pointer-events-none fixed inset-0 opacity-[0.025]'
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className='relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-14'>

        {/* ── Page Heading ── */}
        <div className='mb-10'>
          <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>
            <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
            Admin Panel
          </div>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <div>
              <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
                All{' '}
                <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                  Orders
                </span>
              </h1>
              <p className='text-slate-500 text-sm mt-1'>{orderdata.length} total orders</p>
            </div>
            <button
              onClick={GetOrders}
              className='flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-sm hover:text-white hover:border-violet-500/30 hover:bg-violet-500/[0.06] transition-all duration-200 cursor-pointer'
            >
              <MdRefresh className={`text-lg ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
          <div className='h-px w-full bg-gradient-to-r from-violet-500/20 via-white/[0.05] to-transparent mt-4' />
        </div>

        {/* ── Loading state ── */}
        {loading ? (
          <div className='flex flex-col items-center justify-center py-24 gap-4'>
            <div className='w-10 h-10 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin' />
            <p className='text-slate-500 text-sm'>Loading orders...</p>
          </div>

        ) : orderdata.length === 0 ? (

          /* ── Empty state ── */
          <div className='flex flex-col items-center justify-center py-24 gap-4'>
            <div className='w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center'>
              <BsBoxSeam className='text-3xl text-slate-600' />
            </div>
            <p className='text-white font-semibold text-lg'>No orders yet</p>
            <p className='text-slate-500 text-sm'>Orders will appear here once customers place them.</p>
          </div>

        ) : (

          /* ── Orders list ── */
          <div className='flex flex-col gap-5'>
            {orderdata.map((order, idx) => (
              <div
                key={order._id || idx}
                className='bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-violet-500/20 transition-all duration-300 relative'
              >
                {/* top glow line */}
                <div className='absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent' />

                {/* ── Order Header ── */}
                <div className='flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.05]'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center'>
                      <BsBoxSeam className='text-violet-400 text-base' />
                    </div>
                    <div>
                      <p className='text-white text-sm font-bold tracking-tight'>
                        Order #{order._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className='text-slate-500 text-xs mt-0.5'>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                          : 'N/A'
                        }
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3 flex-wrap'>
                    {/* Payment badge */}
                    <span className={`px-3 py-1 rounded-lg border text-xs font-semibold ${order.payment ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'}`}>
                      {order.payment ? '✓ Paid' : '⏳ Unpaid'}
                    </span>

                    {/* Payment method */}
                    <span className='px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-400 text-xs font-medium'>
                      {order.paymentMethoud || 'COD'}
                    </span>

                    {/* Current status badge */}
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status || 'Order Placed'}
                    </span>
                  </div>
                </div>

                {/* ── Main body: items + address + status ── */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]'>

                  {/* Items */}
                  <div className='col-span-1 px-6 py-4 flex flex-col gap-3'>
                    <p className='text-slate-500 text-[10px] font-semibold uppercase tracking-widest mb-1'>Items</p>
                    {order.items?.map((item, i) => (
                      <div key={i} className='flex items-center gap-3'>
                        <div className='w-12 h-12 rounded-xl overflow-hidden border border-white/[0.07] shrink-0'>
                          <img
                            src={item.productId?.image1 || 'https://via.placeholder.com/48'}
                            className='w-full h-full object-cover'
                            alt={item.productId?.name}
                          />
                        </div>
                        <div className='min-w-0'>
                          <p className='text-white text-xs font-medium truncate'>{item.productId?.name}</p>
                          <p className='text-slate-500 text-[10px] mt-0.5'>
                            Qty: {item.quantity} &nbsp;|&nbsp; Size: {item.size} &nbsp;|&nbsp; Rs {item.productId?.price}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className='mt-2 pt-2 border-t border-white/[0.05]'>
                      <p className='text-slate-500 text-xs'>Total: <span className='text-violet-300 font-bold text-sm'>Rs {order.amount}</span></p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className='col-span-1 px-6 py-4'>
                    <p className='text-slate-500 text-[10px] font-semibold uppercase tracking-widest mb-3'>Customer Info</p>
                    <div className='flex flex-col gap-2.5'>
                      <div className='flex items-center gap-2'>
                        <IoPersonOutline className='text-violet-400 text-sm shrink-0' />
                        <p className='text-white text-sm font-medium'>
                          {order.address?.firstname} {order.address?.lastname}
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <IoCallOutline className='text-violet-400 text-sm shrink-0' />
                        <p className='text-slate-400 text-xs'>{order.address?.phone}</p>
                      </div>
                      <div className='flex items-start gap-2'>
                        <IoLocationOutline className='text-violet-400 text-sm shrink-0 mt-0.5' />
                        <p className='text-slate-400 text-xs leading-relaxed'>
                          {order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.country} — {order.address?.pincode}
                        </p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-violet-400 text-xs'>✉</span>
                        <p className='text-slate-400 text-xs'>{order.address?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className='col-span-1 px-6 py-4 flex flex-col justify-center gap-3'>
                    <p className='text-slate-500 text-[10px] font-semibold uppercase tracking-widest'>Update Status</p>

                    <select
                      value={order.status || 'Order Placed'}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                      className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-violet-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                      style={{ backgroundColor: '#0f1629' }}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status} style={{ backgroundColor: '#0f1629', color: '#fff' }}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {updatingId === order._id ? (
                      <div className='flex items-center gap-2 text-violet-300 text-xs'>
                        <svg className='animate-spin h-3 w-3' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Updating...
                      </div>
                    ) : (
                      <p className='text-slate-600 text-xs'>Select status to update instantly</p>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders