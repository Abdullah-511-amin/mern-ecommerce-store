import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopDataContext } from '../Context/ShopContext'
import Card from './Card'

function BestSeller() {
    const { products } = useContext(ShopDataContext)
    
    const [bestseller, setbestseller] = useState([])

    useEffect(() => {
        setbestseller(products?.filter((item) => item.bestSeller) || [])
    }, [products])

    return (
        <div className='py-20 flex flex-col items-center'>

            {/* ── Section divider line ── */}
            <div className='w-[90%] max-w-7xl h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-20' />

            {/* ── Heading ── */}
            <div className='w-full text-center mb-10'>
                <Title text1={'BEST'} text2={'SELLER'} />
                <p className='text-slate-400 text-sm md:text-base px-4 mt-2'>
                    Tried, Tested, Loved — Discover Our All-Time Best Sellers!
                </p>
            </div>

            {/* ── Cards grid ── */}
            <div className='w-[90%] max-w-7xl flex justify-center items-start flex-wrap gap-5'>
                {bestseller?.map((data) => (
                    <Card
                        key={data._id}
                        image={data.image1}
                        name={data.name}
                        price={data.price}
                    />
                ))}
            </div>

        </div>
    )
}

export default BestSeller