import React, { useContext, useEffect, useState } from 'react'
import { AuthDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { MdLocalShipping, MdCheckCircle, MdPending, MdCancel } from 'react-icons/md'
import { BsBoxSeam } from 'react-icons/bs'
import { IoReceiptOutline } from 'react-icons/io5'

function MyOrders() {
    const [userorderdata, setuserorderdata] = useState([])
    const { serverurl } = useContext(AuthDataContext)

    const GetOrderData = async () => {
        try {
            const res = await axios.get(serverurl + '/user-orders', { withCredentials: true })
            if (res.data.success) {
                console.log(res.data)
                // res.data.orders is the array of orders
                // API returns single object or array — normalize to array
                const orders = res.data.orders
                setuserorderdata(Array.isArray(orders) ? orders : [orders])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetOrderData()
    }, [])

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return <MdCheckCircle className='text-emerald-400 text-lg' />
            case 'shipped': return <MdLocalShipping className='text-cyan-400 text-lg' />
            case 'cancelled': return <MdCancel className='text-red-400 text-lg' />
            default: return <MdPending className='text-yellow-400 text-lg' />
        }
    }

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
            case 'shipped': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
            case 'cancelled': return 'text-red-400 bg-red-500/10 border-red-500/20'
            default: return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
        }
    }

    return (
        <div className='w-full min-h-screen bg-[#080c18] relative overflow-hidden'>

            {/* ── Background blobs ── */}
            <div className='pointer-events-none fixed inset-0 overflow-hidden'>
                <div className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-[0.09] blur-[120px] animate-pulse' />
                <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-[0.07] blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-fuchsia-600 opacity-[0.05] blur-[90px] animate-pulse' style={{ animationDelay: '4s' }} />
            </div>

            {/* ── Grid overlay ── */}
            <div
                className='pointer-events-none fixed inset-0 opacity-[0.025]'
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            <div className='relative z-10 max-w-4xl mx-auto px-6 md:px-10 py-14'>

                {/* ── Page Heading ── */}
                <div className='mb-10'>
                    <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>
                        <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
                        Orders
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
                            My{' '}
                            <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                                Orders
                            </span>
                        </h1>
                        <button
                            onClick={GetOrderData}
                            className='flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 text-sm hover:text-white hover:border-violet-500/30 hover:bg-violet-500/[0.06] transition-all duration-200 cursor-pointer'
                        >
                            <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                            </svg>
                            Refresh
                        </button>
                    </div>
                    <div className='h-px w-full bg-gradient-to-r from-violet-500/20 via-white/[0.05] to-transparent mt-4' />
                </div>

                {/* ── Orders List ── */}
                {userorderdata.length === 0 ? (

                    /* ── Empty state ── */
                    <div className='flex flex-col items-center justify-center py-24 gap-5'>
                        <div className='w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center'>
                            <IoReceiptOutline className='text-3xl text-slate-600' />
                        </div>
                        <div className='text-center'>
                            <p className='text-white font-semibold text-lg mb-1'>No orders yet</p>
                            <p className='text-slate-500 text-sm'>Your orders will appear here once you place one.</p>
                        </div>
                        <a href='/collections'>
                            <button className='px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:-translate-y-[1px] transition-all duration-200 cursor-pointer'>
                                Start Shopping →
                            </button>
                        </a>
                    </div>

                ) : (

                    <div className='flex flex-col gap-4'>
                        {userorderdata.map((order, orderIndex) => (
                            <div
                                key={order._id || orderIndex}
                                className='bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-violet-500/20 transition-all duration-300 relative'
                            >
                                {/* top glow line */}
                                <div className='absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent' />

                                {/* ── Order Header ── */}
                                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.05]'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center'>
                                            <BsBoxSeam className='text-violet-400 text-base' />
                                        </div>
                                        <div>
                                            <p className='text-white text-sm font-semibold'>
                                                Order #{order._id?.slice(-8).toUpperCase() || `00${orderIndex + 1}`}
                                            </p>
                                            <p className='text-slate-500 text-xs mt-0.5'>
                                                {order.createdAt
                                                    ? new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
                                                    : 'Date not available'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        {/* Payment method badge */}
                                        <span className='px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-slate-400 text-xs font-medium'>
                                            {order.paymentMethoud || 'COD'}
                                        </span>

                                        {/* Status badge */}
                                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status || 'Pending'}
                                        </span>
                                    </div>
                                </div>

                                {/* ── Order Items ── */}
                                <div className='px-6 py-4 flex flex-col gap-3'>
                                    {order.items?.map((item, itemIndex) => (
                                        <div key={itemIndex} className='flex items-center gap-4'>
                                            {/* Product image */}
                                            <div className='w-14 h-14 rounded-xl overflow-hidden border border-white/[0.07] shrink-0 bg-white/[0.02]'>
                                                <img
                                                    src={item.productId?.image1 || 'https://via.placeholder.com/56'}
                                                    className='w-full h-full object-cover'
                                                    alt={item.productId?.name}
                                                />
                                            </div>

                                            {/* Product info */}
                                            <div className='flex-1 min-w-0'>
                                                <p className='text-white text-sm font-medium truncate'>
                                                    {item.productId?.name || 'Product'}
                                                </p>
                                                <div className='flex items-center gap-3 mt-1'>
                                                    <span className='text-slate-500 text-xs'>Qty: {item.quantity}</span>
                                                    {item.size && <span className='text-slate-500 text-xs'>Size: {item.size}</span>}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <p className='text-violet-300 text-sm font-semibold shrink-0'>
                                                Rs {item.productId?.price * item.quantity}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* ── Order Footer ── */}
                                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-t border-white/[0.05] bg-white/[0.02]'>
                                    <div className='flex items-center gap-4'>
                                        <div>
                                            <p className='text-slate-500 text-xs'>Delivery Address</p>
                                            <p className='text-slate-300 text-xs mt-0.5'>
                                                {order.address
                                                    ? `${order.address.city}, ${order.address.country}`
                                                    : 'N/A'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-4'>
                                        <div className='text-right'>
                                            <p className='text-slate-500 text-xs'>Total Amount</p>
                                            <p className='text-white font-bold text-base'>Rs {order.amount}</p>
                                        </div>
                                        <button
                                            onClick={GetOrderData}
                                            className='px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold hover:bg-violet-500/20 hover:border-violet-500/40 hover:text-white transition-all duration-200 cursor-pointer'
                                        >
                                            Track Order
                                        </button>
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

export default MyOrders