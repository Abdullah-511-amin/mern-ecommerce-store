import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { ShopDataContext } from '../Context/ShopContext'
import axios from 'axios'
import { AuthDataContext } from '../Context/AuthContext'
import { MdLocalShipping, MdPayment } from 'react-icons/md'
import { RiSecurePaymentLine } from 'react-icons/ri'
import { BsCashCoin } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {
    const { serverurl } = useContext(AuthDataContext)
    const [paymentMethoud, setpaymentMethoud] = useState('COD')
    const { cartdata, setcartdata } = useContext(ShopDataContext)

    const [addressdata, setaddressdata] = useState({
        firstname: '',
        lastname: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: ''
    })

    const [loading, setloading] = useState(false)
    const navigate = useNavigate()

    const isFormValid =
        addressdata.firstname &&
        addressdata.lastname &&
        addressdata.email &&
        addressdata.street &&
        addressdata.city &&
        addressdata.state &&
        addressdata.pincode &&
        addressdata.country &&
        addressdata.phone

    const handlechange = (e) => {
        const { name, value } = e.target
        setaddressdata((prev) => ({ ...prev, [name]: value }))
    }

    const handlesubmit = async () => {
        setloading(true)
        const subtotal = cartdata?.reduce(
            (total, item) => total + (item.productId.price * item.quantity), 0
        ) || 0
        const totalAmount = subtotal + 100
        if (paymentMethoud === 'RAZORPAY') {
            alert('please use cod because payment methoud have issues so no one can use it')
        }
        const orderdata = {
            address: addressdata,
            items: cartdata,
            amount: totalAmount,
            paymentMethoud
        }
        try {
            const res = await axios.post(serverurl + '/order-product', orderdata, { withCredentials: true })
            if (res.data.success) {
                setaddressdata({
                    firstname: '', lastname: '', email: '',
                    street: '', city: '', state: '',
                    pincode: '', country: '', phone: ''
                })
                navigate('/my-orders')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.05] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15]'

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

            <div className='relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-14'>

                {/* ── Page heading ── */}
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>
                        <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
                        Checkout
                    </div>
                    <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
                        Complete Your{' '}
                        <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                            Order
                        </span>
                    </h1>
                </div>

                <div className='flex flex-col lg:flex-row gap-8 items-start'>

                    {/* ── LEFT — Delivery Info ── */}
                    <div className='flex-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 md:p-8 relative overflow-hidden'>
                        <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent' />

                        {/* Section heading */}
                        <div className='flex items-center gap-3 mb-7'>
                            <div className='w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center'>
                                <MdLocalShipping className='text-violet-400 text-lg' />
                            </div>
                            <div>
                                <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                            </div>
                        </div>

                        <form className='flex flex-col gap-4'>

                            {/* First + Last name */}
                            <div className='flex gap-4'>
                                <div className='flex-1 flex flex-col gap-1.5'>
                                    <label className='text-slate-400 text-xs font-medium tracking-wide'>First Name</label>
                                    <input type="text" placeholder='Muhammad' className={inputClass} onChange={handlechange} name='firstname' required />
                                </div>
                                <div className='flex-1 flex flex-col gap-1.5'>
                                    <label className='text-slate-400 text-xs font-medium tracking-wide'>Last Name</label>
                                    <input type="text" placeholder='Ali' className={inputClass} onChange={handlechange} name='lastname' required />
                                </div>
                            </div>

                            {/* Email */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-slate-400 text-xs font-medium tracking-wide'>Email Address</label>
                                <input type="email" placeholder='you@example.com' className={inputClass} onChange={handlechange} name='email' required />
                            </div>

                            {/* Street */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-slate-400 text-xs font-medium tracking-wide'>Street Address</label>
                                <input type="text" placeholder='House No, Street Name' className={inputClass} onChange={handlechange} name='street' required />
                            </div>

                            {/* City + State */}
                            <div className='flex gap-4'>
                                <div className='flex-1 flex flex-col gap-1.5'>
                                    <label className='text-slate-400 text-xs font-medium tracking-wide'>City</label>
                                    <input type="text" placeholder='Lahore' className={inputClass} onChange={handlechange} name='city' required />
                                </div>
                                <div className='flex-1 flex flex-col gap-1.5'>
                                    <label className='text-slate-400 text-xs font-medium tracking-wide'>State</label>
                                    <input type="text" placeholder='Punjab' className={inputClass} onChange={handlechange} name='state' required />
                                </div>
                            </div>

                            {/* Pincode + Country */}
                            <div className='flex gap-4'>
                                <div className='flex-1 flex flex-col gap-1.5'>
                                    <label className='text-slate-400 text-xs font-medium tracking-wide'>Pincode</label>
                                    <input type="text" placeholder='54000' className={inputClass} onChange={handlechange} name='pincode' required />
                                </div>
                                <div className='flex-1 flex flex-col gap-1.5'>
                                    <label className='text-slate-400 text-xs font-medium tracking-wide'>Country</label>
                                    <input type="text" placeholder='Pakistan' className={inputClass} onChange={handlechange} name='country' required />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-slate-400 text-xs font-medium tracking-wide'>Phone Number</label>
                                <input type="number" placeholder='+92 300 123 4567' className={inputClass} onChange={handlechange} name='phone' required />
                            </div>

                        </form>
                    </div>

                    {/* ── RIGHT — Cart Total + Payment ── */}
                    <div className='lg:w-[380px] flex flex-col gap-5'>

                        {/* Cart Total card */}
                        <div className='bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden'>
                            <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent' />
                            <CartTotal showButton={false} />
                        </div>

                        {/* Payment Method card */}
                        <div className='bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden'>
                            <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent' />

                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center'>
                                    <MdPayment className='text-violet-400 text-lg' />
                                </div>
                                <Title text1={'Payment'} text2={'Method'} />
                            </div>

                            <div className='flex flex-col gap-3'>

                                {/* Razorpay */}
                                <button
                                    type='button'
                                    onClick={() => setpaymentMethoud('RAZORPAY')}
                                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border transition-all duration-200 cursor-pointer
                                        ${paymentMethoud === 'RAZORPAY'
                                            ? 'bg-violet-600/20 border-violet-500 shadow-lg shadow-violet-500/20'
                                            : 'bg-white/[0.03] border-white/[0.08] hover:border-violet-500/30 hover:bg-violet-500/[0.05]'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                                        ${paymentMethoud === 'RAZORPAY' ? 'border-violet-400' : 'border-slate-600'}`}>
                                        {paymentMethoud === 'RAZORPAY' && (
                                            <div className='w-2 h-2 rounded-full bg-violet-400' />
                                        )}
                                    </div>
                                    <RiSecurePaymentLine className={`text-xl transition-colors duration-200 ${paymentMethoud === 'RAZORPAY' ? 'text-violet-400' : 'text-slate-500'}`} />
                                    <div className='text-left'>
                                        <p className={`text-sm font-semibold transition-colors duration-200 ${paymentMethoud === 'RAZORPAY' ? 'text-white' : 'text-slate-400'}`}>Razorpay</p>
                                        <p className='text-slate-600 text-xs'>UPI, Cards, Net Banking</p>
                                    </div>
                                </button>

                                {/* COD */}
                                <button
                                    type='button'
                                    onClick={() => setpaymentMethoud('COD')}
                                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl border transition-all duration-200 cursor-pointer
                                        ${paymentMethoud === 'COD'
                                            ? 'bg-violet-600/20 border-violet-500 shadow-lg shadow-violet-500/20'
                                            : 'bg-white/[0.03] border-white/[0.08] hover:border-violet-500/30 hover:bg-violet-500/[0.05]'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200
                                        ${paymentMethoud === 'COD' ? 'border-violet-400' : 'border-slate-600'}`}>
                                        {paymentMethoud === 'COD' && (
                                            <div className='w-2 h-2 rounded-full bg-violet-400' />
                                        )}
                                    </div>
                                    <BsCashCoin className={`text-xl transition-colors duration-200 ${paymentMethoud === 'COD' ? 'text-violet-400' : 'text-slate-500'}`} />
                                    <div className='text-left'>
                                        <p className={`text-sm font-semibold transition-colors duration-200 ${paymentMethoud === 'COD' ? 'text-white' : 'text-slate-400'}`}>Cash on Delivery</p>
                                        <p className='text-slate-600 text-xs'>Pay when your order arrives</p>
                                    </div>
                                </button>

                            </div>

                            {/* Place Order button */}
                            <button
                                onClick={handlesubmit}
                                disabled={!isFormValid || loading}
                                className={`w-full mt-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer
                                    ${isFormValid && !loading
                                        ? 'bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[1px] active:scale-[0.99]'
                                        : 'bg-white/[0.04] border border-white/[0.08] text-slate-600 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <svg className='animate-spin h-4 w-4 text-white/80' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Placing Order...
                                    </>
                                ) : (
                                    'Place Order →'
                                )}
                            </button>

                            {!isFormValid && (
                                <p className='text-slate-600 text-xs text-center mt-3'>
                                    Please fill all delivery fields to continue
                                </p>
                            )}

                        </div>

                        {/* Trust badges */}
                        <div className='grid grid-cols-3 gap-3'>
                            {[
                                { text: '100% Secure', sub: 'Checkout' },
                                { text: 'Cash on', sub: 'Delivery' },
                                { text: 'Easy', sub: '7-Day Return' },
                            ].map(({ text, sub }) => (
                                <div key={text} className='flex flex-col items-center py-3 px-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center'>
                                    <p className='text-white text-xs font-semibold leading-tight'>{text}</p>
                                    <p className='text-slate-600 text-[10px] mt-0.5'>{sub}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder