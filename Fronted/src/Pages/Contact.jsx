import React, { useState } from 'react'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
import { HiOutlinePaperAirplane } from 'react-icons/hi'

function Contact() {

    const [formdata, setformdata] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [loading, setloading] = useState(false)
    const [sent, setsent] = useState(false)

    const handlechange = (e) => {
        const { name, value } = e.target
        setformdata((prev) => ({ ...prev, [name]: value }))
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        setloading(true)
        // plug in your email/backend logic here
        setTimeout(() => {
            setloading(false)
            setsent(true)
        }, 1800)
    }

    const contactInfo = [
        {
            icon: MdLocationOn,
            label: 'Our Location',
            value: 'Lahore, Punjab, Pakistan',
            sub: 'Come visit our flagship store'
        },
        {
            icon: MdPhone,
            label: 'Phone Number',
            value: '+92 300 123 4567',
            sub: 'Mon – Sat, 9am to 9pm'
        },
        {
            icon: MdEmail,
            label: 'Email Address',
            value: 'support@onecart.pk',
            sub: 'We reply within 24 hours'
        },
        {
            icon: BiSupport,
            label: 'Live Support',
            value: '24 / 7 Available',
            sub: 'Chat with our support team'
        },
    ]

    return (
        <div className='w-full min-h-screen bg-[#080c18] relative overflow-hidden'>

            {/* Background blobs */}
            <div className='pointer-events-none fixed inset-0 overflow-hidden'>
                <div className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-[0.09] blur-[120px] animate-pulse' />
                <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-[0.07] blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-fuchsia-600 opacity-[0.05] blur-[90px] animate-pulse' style={{ animationDelay: '4s' }} />
            </div>

            {/* Grid overlay */}
            <div
                className='pointer-events-none fixed inset-0 opacity-[0.025]'
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16'>

                {/* Page Heading */}
                <div className='text-center mb-14'>
                    <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5'>
                        <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
                        Get In Touch
                    </div>
                    <h1 className='text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4'>
                        We'd Love to{' '}
                        <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                            Hear From You
                        </span>
                    </h1>
                    <p className='text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed'>
                        Have a question about an order, a product, or just want to say hello? Our team is ready to help you out.
                    </p>
                </div>

                {/* Main Grid: Form + Info */}
                <div className='flex flex-col lg:flex-row gap-8 mb-16'>

                    {/* LEFT — Contact Form */}
                    <div className='flex-1 relative'>
                        <div className='absolute inset-0 bg-violet-600/5 blur-[40px] rounded-3xl -z-10' />
                        <div className='bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 md:p-9 relative overflow-hidden h-full'>
                            <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent' />

                            <h2 className='text-white font-bold text-lg mb-1'>Send a Message</h2>
                            <p className='text-slate-500 text-xs mb-7'>Fill in the form and we will get back to you shortly.</p>

                            {sent ? (
                                <div className='flex flex-col items-center justify-center py-16 gap-5'>
                                    <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30'>
                                        <svg className='w-7 h-7 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                                        </svg>
                                    </div>
                                    <div className='text-center'>
                                        <p className='text-white font-semibold text-lg mb-1'>Message Sent!</p>
                                        <p className='text-slate-500 text-sm'>We will reply to <span className='text-violet-300'>{formdata.email}</span> within 24 hours.</p>
                                    </div>
                                    <button
                                        onClick={() => { setsent(false); setformdata({ name: '', email: '', subject: '', message: '' }) }}
                                        className='px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.09] text-slate-300 text-sm hover:bg-white/[0.07] hover:text-white transition-all duration-200 cursor-pointer'
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form className='flex flex-col gap-5' onSubmit={handlesubmit}>

                                    <div className='flex flex-col sm:flex-row gap-5'>
                                        <div className='flex-1 flex flex-col gap-1.5'>
                                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Full Name</label>
                                            <input
                                                type="text"
                                                name='name'
                                                value={formdata.name}
                                                onChange={handlechange}
                                                placeholder='Muhammad Ali'
                                                required
                                                className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.05] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15]'
                                            />
                                        </div>
                                        <div className='flex-1 flex flex-col gap-1.5'>
                                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Email Address</label>
                                            <input
                                                type="email"
                                                name='email'
                                                value={formdata.email}
                                                onChange={handlechange}
                                                placeholder='you@example.com'
                                                required
                                                className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.05] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15]'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-1.5'>
                                        <label className='text-slate-400 text-xs font-medium tracking-wide'>Subject</label>
                                        <input
                                            type="text"
                                            name='subject'
                                            value={formdata.subject}
                                            onChange={handlechange}
                                            placeholder='Order issue, Product query, General inquiry...'
                                            required
                                            className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.05] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15]'
                                        />
                                    </div>

                                    <div className='flex flex-col gap-1.5'>
                                        <label className='text-slate-400 text-xs font-medium tracking-wide'>Message</label>
                                        <textarea
                                            name='message'
                                            value={formdata.message}
                                            onChange={handlechange}
                                            placeholder='Tell us how we can help you...'
                                            rows={5}
                                            required
                                            className='w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.05] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15] resize-none'
                                        />
                                    </div>

                                    <button
                                        type='submit'
                                        disabled={loading}
                                        className='w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[1px] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2'
                                    >
                                        {loading ? (
                                            <>
                                                <svg className='animate-spin h-4 w-4 text-white/80' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <HiOutlinePaperAirplane className='text-base rotate-90' />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                </form>
                            )}
                        </div>
                    </div>

                    {/* RIGHT — Contact Info */}
                    <div className='lg:w-80 flex flex-col gap-4'>

                        {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                            <div key={label} className='flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/25 hover:bg-violet-500/[0.04] transition-all duration-300 group'>
                                <div className='w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all duration-300'>
                                    <Icon className='text-lg text-violet-400' />
                                </div>
                                <div>
                                    <p className='text-slate-500 text-[10px] font-semibold uppercase tracking-widest mb-0.5'>{label}</p>
                                    <p className='text-white text-sm font-medium leading-snug'>{value}</p>
                                    <p className='text-slate-600 text-xs mt-0.5'>{sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Social links */}
                        <div className='p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]'>
                            <p className='text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4'>Follow Us</p>
                            <div className='flex items-center gap-3'>
                                {[
                                    { icon: FaInstagram, label: 'Instagram', color: 'hover:text-pink-400 hover:border-pink-500/30' },
                                    { icon: FaFacebookF, label: 'Facebook', color: 'hover:text-blue-400 hover:border-blue-500/30' },
                                    { icon: FaTwitter, label: 'Twitter', color: 'hover:text-sky-400 hover:border-sky-500/30' },
                                ].map(({ icon: Icon, label, color }) => (
                                    <a key={label} href='#'
                                        className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-500 ${color} transition-all duration-200`}>
                                        <Icon className='text-base' />
                                        <span className='text-[10px] font-medium'>{label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Business hours */}
                        <div className='p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]'>
                            <p className='text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4'>Business Hours</p>
                            <div className='flex flex-col gap-2.5'>
                                {[
                                    { day: 'Monday – Friday', time: '9:00 AM – 9:00 PM' },
                                    { day: 'Saturday', time: '10:00 AM – 8:00 PM' },
                                    { day: 'Sunday', time: '12:00 PM – 6:00 PM' },
                                ].map(({ day, time }) => (
                                    <div key={day} className='flex justify-between items-center'>
                                        <span className='text-slate-500 text-xs'>{day}</span>
                                        <span className='text-violet-300 text-xs font-medium'>{time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>

                {/* Bottom CTA strip */}
                <div className='relative rounded-2xl overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-r from-violet-900/40 via-fuchsia-900/20 to-cyan-900/20 pointer-events-none' />
                    <div className='absolute inset-0 border border-violet-500/20 rounded-2xl pointer-events-none' />
                    <div className='absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent' />
                    <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 px-8 md:px-12 py-8'>
                        <div>
                            <p className='text-violet-300 text-xs font-semibold uppercase tracking-widest mb-1'>Quick Help</p>
                            <h3 className='text-white text-lg md:text-xl font-bold tracking-tight'>Need help with your order?</h3>
                            <p className='text-slate-400 text-sm mt-1'>Check our FAQ or reach out — we are always here.</p>
                        </div>
                        <a href='mailto:support@onecart.pk' className='shrink-0'>
                            <button className='px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/30 hover:-translate-y-[1px] transition-all duration-200 cursor-pointer whitespace-nowrap'>
                                Email Us →
                            </button>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contact