import React, { useContext, useRef, useState } from 'react'
import { IoImagesOutline } from "react-icons/io5"
import { MdOutlineDriveFileRenameOutline } from "react-icons/md"
import { BsStars } from "react-icons/bs"
import axios from 'axios'
import { AuthDataContext } from '../Context/AuthContext'

function Addhn() {
    const sizes = ['S', 'M', 'L', 'XL', 'XXL']
    const [loading, setloading] = useState(false)
    const [success, setsuccess] = useState(false)

    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()

    const { serverurl } = useContext(AuthDataContext)

    const [productdata, setproductdata] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Men',
        subCategory: 'TopWear',
        sizes: '',
        bestseller: false,
    })

    const [frontedimage, setfrontedimage] = useState({
        image1: '', image2: '', image3: '', image4: ''
    })

    const [backenedimage, setbackenedimage] = useState({
        image1: null, image2: null, image3: null, image4: null
    })

    const hamdleimagechange = (e) => {
        const { name, files } = e.target
        if (!files[0]) return
        setfrontedimage((prev) => ({ ...prev, [name]: URL.createObjectURL(files[0]) }))
        setbackenedimage((prev) => ({ ...prev, [name]: files[0] }))
    }

    const handlechange = (e) => {
        const { name, value } = e.target
        setproductdata((prev) => ({ ...prev, [name]: value }))
    }

    async function handlesubmit() {
        setloading(true)
        setsuccess(false)
        try {
            const formdata = new FormData()
            formdata.append('name', productdata.name)
            formdata.append('description', productdata.description)
            formdata.append('price', productdata.price)
            formdata.append('category', productdata.category)
            formdata.append('subCategory', productdata.subCategory)
            formdata.append('sizes', JSON.stringify(productdata.sizes))
            formdata.append('bestseller', productdata.bestseller ? "true" : "false")
            formdata.append('image1', backenedimage.image1)
            formdata.append('image2', backenedimage.image2)
            formdata.append('image3', backenedimage.image3)
            formdata.append('image4', backenedimage.image4)

            const res = await axios.post(serverurl + '/product/add', formdata, { withCredentials: true })
            setsuccess(true)
            // reset form
            setproductdata({ name: '', description: '', price: '', category: 'Men', subCategory: 'TopWear', sizes: '', bestseller: false })
            setfrontedimage({ image1: '', image2: '', image3: '', image4: '' })
            setbackenedimage({ image1: null, image2: null, image3: null, image4: null })
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm placeholder:text-slate-600 outline-none focus:border-violet-500 focus:bg-violet-500/[0.05] focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15]'
    const selectClass = 'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.09] text-white text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 hover:border-white/[0.15] cursor-pointer'

    const imageRefs = [ref1, ref2, ref3, ref4]
    const imageKeys = ['image1', 'image2', 'image3', 'image4']

    return (
        <div className='flex-1 min-h-screen overflow-y-auto py-10 px-6 md:px-10 relative'>

            {/* ── Page heading ── */}
            <div className='mb-10'>
                <div className='inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4'>
                    <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse inline-block' />
                    Admin Panel
                </div>
                <h1 className='text-3xl md:text-4xl font-bold text-white tracking-tight'>
                    Add{' '}
                    <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                        Product
                    </span>
                </h1>
                <div className='h-px w-full bg-gradient-to-r from-violet-500/20 via-white/[0.05] to-transparent mt-4' />
            </div>

            {/* ── Success banner ── */}
            {success && (
                <div className='flex items-center gap-3 px-5 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6'>
                    <MdOutlineDriveFileRenameOutline className='text-emerald-400 text-xl shrink-0' />
                    <p className='text-emerald-300 text-sm font-medium'>Product added successfully!</p>
                </div>
            )}

            <div className='max-w-2xl flex flex-col gap-8'>

                {/* ── Image Upload ── */}
                <div className='bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden'>
                    <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent' />

                    <h2 className='text-white font-semibold text-sm mb-1'>Product Images</h2>
                    <p className='text-slate-500 text-xs mb-5'>Upload up to 4 images. Click to select.</p>

                    <div className='flex gap-4 flex-wrap'>
                        {imageKeys.map((key, i) => (
                            <div
                                key={key}
                                onClick={() => imageRefs[i].current.click()}
                                className={`relative w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden group
                                    ${frontedimage[key]
                                        ? 'border-violet-500/50'
                                        : 'border-white/[0.1] hover:border-violet-500/40 hover:bg-violet-500/[0.04]'
                                    }`}
                            >
                                {frontedimage[key] ? (
                                    <>
                                        <img src={frontedimage[key]} className='w-full h-full object-cover' alt={key} />
                                        <div className='absolute inset-0 bg-violet-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
                                            <p className='text-white text-[10px] font-medium'>Change</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className='flex flex-col items-center gap-1.5'>
                                        <IoImagesOutline className='text-2xl text-slate-600 group-hover:text-violet-400 transition-colors duration-200' />
                                        <span className='text-slate-600 text-[10px] group-hover:text-violet-400 transition-colors duration-200'>
                                            Image {i + 1}
                                        </span>
                                    </div>
                                )}
                                <input type="file" hidden name={key} ref={imageRefs[i]} onChange={hamdleimagechange} accept='image/*' />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Product Details ── */}
                <div className='bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden'>
                    <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent' />

                    <h2 className='text-white font-semibold text-sm mb-5'>Product Details</h2>

                    <div className='flex flex-col gap-5'>

                        {/* Name */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={productdata.name}
                                placeholder='e.g. Premium Winter Jacket'
                                className={inputClass}
                                onChange={handlechange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Description</label>
                            <textarea
                                name="description"
                                value={productdata.description}
                                placeholder='Describe the product in detail...'
                                rows={4}
                                className={inputClass + ' resize-none'}
                                onChange={handlechange}
                                required
                            />
                        </div>

                        {/* Category + SubCategory */}
                        <div className='flex gap-4'>
                            <div className='flex-1 flex flex-col gap-1.5'>
                                <label className='text-slate-400 text-xs font-medium tracking-wide'>Category</label>
                                <select name="category" className={selectClass} onChange={handlechange} style={{ backgroundColor: '#0b1120' }}>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kid">Kid</option>
                                </select>
                            </div>
                            <div className='flex-1 flex flex-col gap-1.5'>
                                <label className='text-slate-400 text-xs font-medium tracking-wide'>Sub-Category</label>
                                <select name="subCategory" className={selectClass} onChange={handlechange} style={{ backgroundColor: '#0b1120' }}>
                                    <option value="TopWear">Top Wear</option>
                                    <option value="BottomWear">Bottom Wear</option>
                                    <option value="WinterWear">Winter Wear</option>
                                </select>
                            </div>
                        </div>

                        {/* Price */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-slate-400 text-xs font-medium tracking-wide'>Price (Rs)</label>
                            <input
                                type="number"
                                name="price"
                                value={productdata.price}
                                placeholder='e.g. 2500'
                                className={inputClass}
                                onChange={handlechange}
                                required
                            />
                        </div>

                    </div>
                </div>

                {/* ── Size + Bestseller ── */}
                <div className='bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden'>
                    <div className='absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent' />

                    {/* Sizes */}
                    <div className='mb-6'>
                        <label className='text-slate-400 text-xs font-medium tracking-wide block mb-3'>Select Size</label>
                        <div className='flex gap-3 flex-wrap'>
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    type='button'
                                    onClick={() => setproductdata((prev) => ({ ...prev, sizes: size }))}
                                    className={`w-12 h-12 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer
                                        ${productdata.sizes === size
                                            ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/30 scale-105'
                                            : 'bg-white/[0.04] border-white/[0.09] text-slate-400 hover:border-violet-500/40 hover:text-white'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bestseller toggle */}
                    <div
                        onClick={() => setproductdata((prev) => ({ ...prev, bestseller: !prev.bestseller }))}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200
                            ${productdata.bestseller
                                ? 'bg-violet-600/15 border-violet-500/30'
                                : 'bg-white/[0.03] border-white/[0.07] hover:border-violet-500/20 hover:bg-violet-500/[0.04]'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                            ${productdata.bestseller ? 'bg-violet-500/20 border border-violet-500/40' : 'bg-white/[0.04] border border-white/[0.08]'}`}>
                            <BsStars className={`text-lg transition-colors duration-200 ${productdata.bestseller ? 'text-violet-400' : 'text-slate-600'}`} />
                        </div>
                        <div>
                            <p className={`text-sm font-semibold transition-colors duration-200 ${productdata.bestseller ? 'text-white' : 'text-slate-400'}`}>
                                Mark as Best Seller
                            </p>
                            <p className='text-slate-600 text-xs mt-0.5'>Featured in Best Sellers section</p>
                        </div>
                        {/* toggle pill */}
                        <div className={`ml-auto w-11 h-6 rounded-full border transition-all duration-200 flex items-center px-1
                            ${productdata.bestseller ? 'bg-violet-600 border-violet-500' : 'bg-white/[0.05] border-white/[0.1]'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
                                ${productdata.bestseller ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                    </div>
                </div>

                {/* ── Submit button ── */}
                <button
                    onClick={handlesubmit}
                    disabled={loading}
                    className='w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[1px] active:scale-[0.99] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer'
                >
                    {loading ? (
                        <>
                            <svg className='animate-spin h-4 w-4 text-white/80' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Adding Product...
                        </>
                    ) : (
                        '+ Add Product'
                    )}
                </button>

            </div>
        </div>
    )
}

export default Addhn