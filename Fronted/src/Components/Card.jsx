import React from 'react'

function Card({ image, name, price, onAddToCart }) {

    return (
        <div className='w-56 max-w-[90%] flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden shadow-lg hover:border-violet-500/30 hover:bg-violet-500/[0.04] hover:-translate-y-2 hover:shadow-violet-500/10 hover:shadow-2xl transition-all duration-300 cursor-pointer group'>

            <div className='w-full h-60 overflow-hidden relative'>
                <img
                    src={image || 'https://via.placeholder.com/150'}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    alt={name}
                />
                <div className='absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#080c18]/60 to-transparent pointer-events-none' />
            </div>

            <div className='p-4 flex flex-col gap-1.5'>
                <h2 className='text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-200 leading-snug line-clamp-2'>
                    {name}
                </h2>

                <p className='text-xs font-medium text-violet-400'>
                    Rs {price}
                </p>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        onAddToCart();
                    }}
                    className='mt-2 w-full py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium hover:bg-violet-500/20 hover:border-violet-500/40 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 cursor-pointer'
                >
                    Add To Cart
                </button>
            </div>

        </div>
    )
}

export default Card