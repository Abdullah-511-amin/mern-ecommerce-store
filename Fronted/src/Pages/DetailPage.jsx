import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { IoIosStar, IoIosStarHalf } from "react-icons/io"
import { MdOutlineLocalShipping } from "react-icons/md"
import { RiExchangeFundsLine } from "react-icons/ri"
import { MdOutlineVerified } from "react-icons/md"
import { IoCartOutline } from "react-icons/io5"

function DetailPage() {

  const { products, AddtoCart } = useContext(ShopDataContext)
  const [mainimage, setmainimage] = useState(null)
  const [product, setproduct] = useState(null)
  const [selectedSize, setselectedSize] = useState(null)
  const [added, setadded] = useState(false)
  const { id } = useParams()

  const category = ['S', 'M', 'L', 'XL']

  useEffect(() => {
    const foundProduct = products?.find((data) => data._id === id)
    setproduct(foundProduct)
    if (foundProduct) {
      setmainimage(foundProduct.image1)
    }
  }, [products, id])

  const handleImageClick = (img) => {
    setmainimage(img)
  }
  const handleAddToCart = async () => {

    if (!selectedSize) {
      return alert("Please select a size");
    }

    await AddtoCart(product._id, selectedSize);

    setadded(true);

    setTimeout(() => {
      setadded(false);
    }, 2000);

  }
  const thumbnails = product
    ? [product.image1, product.image2, product.image3, product.image4].filter(Boolean)
    : []

  return (
    <div className='w-full min-h-screen bg-[#080c18] relative overflow-hidden'>

      {/* ── Background blobs ── */}
      <div className='pointer-events-none fixed inset-0 overflow-hidden'>
        <div className='absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600 opacity-[0.09] blur-[120px] animate-pulse' />
        <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500 opacity-[0.07] blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />
        <div className='absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-fuchsia-600 opacity-[0.05] blur-[90px] animate-pulse' style={{ animationDelay: '4s' }} />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className='pointer-events-none fixed inset-0 opacity-[0.025]'
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-12'>

        <div className='flex flex-col lg:flex-row gap-10 items-start'>

          {/* ── LEFT — Thumbnails ── */}
          <div className='flex lg:flex-col flex-row gap-3 lg:w-24'>
            {thumbnails.map((img, i) => (
              <button
                key={i}
                onClick={() => handleImageClick(img)}
                className={`rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shrink-0
                  ${mainimage === img
                    ? 'border-violet-500 shadow-lg shadow-violet-500/30 scale-105'
                    : 'border-white/[0.08] hover:border-violet-500/40 hover:scale-105'
                  }`}
              >
                <img
                  src={img}
                  className='w-20 h-20 lg:w-full lg:h-20 object-cover'
                  alt={`thumb-${i}`}
                />
              </button>
            ))}
          </div>

          {/* ── CENTER — Main Image ── */}
          <div className='flex-1 flex justify-center items-start'>
            <div className='relative w-full max-w-sm lg:max-w-md'>

              {/* glow behind image */}
              <div className='absolute inset-0 bg-violet-600/10 blur-[50px] rounded-3xl scale-95 -z-10' />

              <div className='relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-violet-900/20'>
                {/* violet tint */}
                <div className='absolute inset-0 bg-gradient-to-br from-violet-900/10 to-transparent z-10 pointer-events-none' />
                {/* bottom fade */}
                <div className='absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080c18]/40 to-transparent z-10 pointer-events-none' />

                <img
                  src={mainimage}
                  className='w-full h-[420px] md:h-[500px] object-cover transition-all duration-300'
                  alt={product?.name}
                />

                {/* Badge */}
                <div className='absolute top-4 left-4 z-20'>
                  <span className='inline-flex items-center gap-1.5 bg-[#080c18]/70 backdrop-blur-md border border-violet-500/30 text-violet-300 text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full'>
                    <span className='w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse' />
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Product Info ── */}
          <div className='flex-1 flex flex-col gap-6'>

            {/* Name & Rating */}
            <div>
              <p className='text-violet-300 text-xs font-semibold uppercase tracking-widest mb-2'>
                {product?.category || 'OneCart'}
              </p>
              <h1 className='text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4'>
                {product?.name}
              </h1>

              {/* Stars */}
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-0.5'>
                  {[...Array(4)].map((_, i) => (
                    <IoIosStar key={i} className='text-lg text-yellow-400' />
                  ))}
                  <IoIosStarHalf className='text-lg text-yellow-400' />
                </div>
                <span className='text-slate-400 text-sm font-medium'>4.5</span>
                <span className='text-slate-600 text-sm'>(24 reviews)</span>
              </div>
            </div>

            {/* Divider */}
            <div className='h-px w-full bg-white/[0.06]' />

            {/* Price */}
            <div className='flex items-end gap-3'>
              <p className='text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent'>
                Rs {product?.price}
              </p>
              <p className='text-slate-600 text-sm line-through mb-1'>
                Rs {product?.price ? Math.round(product.price * 1.2) : ''}
              </p>
              <span className='mb-1 px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold'>
                20% OFF
              </span>
            </div>

            {/* Description */}
            <p className='text-slate-400 text-sm leading-relaxed'>
              {product?.description}
            </p>

            {/* Divider */}
            <div className='h-px w-full bg-white/[0.06]' />

            {/* Size selector */}
            <div>
              <div className='flex items-center justify-between mb-3'>
                <h2 className='text-white text-sm font-semibold'>Select Size</h2>
                <button className='text-violet-400 text-xs hover:text-violet-300 transition-colors duration-200 cursor-pointer'>
                  Size Guide →
                </button>
              </div>
              <div className='flex gap-2'>
                {category.map((size) => (
                  <button
                    key={size}
                    onClick={() => setselectedSize(size)}
                    className={`w-11 h-11 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer
                      ${selectedSize === size
                        ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/30 scale-105'
                        : 'bg-white/[0.04] border-white/[0.09] text-slate-400 hover:border-violet-500/40 hover:text-white hover:bg-violet-500/[0.08]'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer
    ${added
                  ? 'bg-emerald-600 border border-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-[1px] active:scale-[0.99]'
                }`}
            >
              {added ? (
                <>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <IoCartOutline className='text-lg' />
                  Add to Cart
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className='grid grid-cols-3 gap-3'>
              {[
                { icon: MdOutlineVerified, text: '100% Original' },
                { icon: MdOutlineLocalShipping, text: 'Cash on Delivery' },
                { icon: RiExchangeFundsLine, text: '7-Day Return' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className='flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-white/[0.03] border border-white/[0.07] text-center'>
                  <Icon className='text-violet-400 text-lg' />
                  <span className='text-slate-500 text-[10px] font-medium leading-tight'>{text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage