import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import Card from '../Components/Card'
import { IoSearchOutline } from 'react-icons/io5'

function Collections() {
    const [category, setcategory] = useState({
        Men: false,
        Women: false,
        Kids: false,
        TopWear: false,
        BottomWear: false,
        WinterWear: false
    })
    const [FilteredProducts, setFilteredProducts] = useState([])

    // ── search state from context ──
    const { products, searchQuery, searchActive } = useContext(ShopDataContext)

    const hanldecategory = (e) => {
        const { name, checked } = e.target
        setcategory((prev) => ({ ...prev, [name]: checked }))
    }

    useEffect(() => {
        const selectedCategories = Object.keys(category).filter((key) => category[key])

        let filtered = products || []

        // 1. Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((item) => selectedCategories.includes(item.category))
        }

        // 2. Search filter — name ya category mein query dhoondo
        if (searchQuery && searchQuery.trim().length > 0) {
            const q = searchQuery.toLowerCase().trim()
            filtered = filtered.filter(
                (item) =>
                    item.name?.toLowerCase().includes(q) ||
                    item.category?.toLowerCase().includes(q) ||
                    item.subCategory?.toLowerCase().includes(q) ||
                    item.description?.toLowerCase().includes(q)
            )
        }

        setFilteredProducts(filtered)
    }, [category, products, searchQuery])  // searchQuery bhi dependency mein

    const categories = ['Men', 'Women', 'Kids']
    const subCategories = ['TopWear', 'BottomWear', 'WinterWear']

    return (
        <div className='w-full min-h-screen bg-[#080c18] flex relative overflow-hidden'>

            {/* ── Background blobs ── */}
            <div className='pointer-events-none fixed inset-0 overflow-hidden'>
                <div className='absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600 opacity-[0.09] blur-[120px] animate-pulse' />
                <div className='absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-cyan-500 opacity-[0.07] blur-[100px] animate-pulse' style={{ animationDelay: '2s' }} />
            </div>

            {/* ── Grid overlay ── */}
            <div
                className='pointer-events-none fixed inset-0 opacity-[0.025]'
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            {/* ── Filter Sidebar ── */}
            <div className='w-[220px] shrink-0 min-h-screen border-r border-white/[0.06] flex flex-col py-8 px-4 relative z-10 bg-[#080c18]/60 backdrop-blur-sm'>

                <div className='flex items-center gap-2 mb-8 px-1'>
                    <div className='w-1 h-5 rounded-full bg-gradient-to-b from-violet-500 to-fuchsia-500' />
                    <h1 className='text-white font-bold text-lg tracking-tight'>Filters</h1>
                </div>

                {/* Categories */}
                <div className='w-full rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5 mb-4'>
                    <h2 className='text-slate-300 text-xs font-semibold uppercase tracking-widest mb-4'>Categories</h2>
                    <div className='flex flex-col gap-3'>
                        {categories.map((cat) => (
                            <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                                <div className='relative'>
                                    <input type="checkbox" onChange={hanldecategory} name={cat} className='peer sr-only' />
                                    <div className='w-4 h-4 rounded border border-white/20 bg-white/[0.04] peer-checked:bg-violet-600 peer-checked:border-violet-500 transition-all duration-200' />
                                </div>
                                <span className='text-slate-400 text-sm group-hover:text-white transition-colors duration-200'>{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Sub-Categories */}
                <div className='w-full rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5'>
                    <h2 className='text-slate-300 text-xs font-semibold uppercase tracking-widest mb-4'>Sub-Category</h2>
                    <div className='flex flex-col gap-3'>
                        {subCategories.map((cat) => (
                            <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                                <div className='relative'>
                                    <input type="checkbox" onChange={hanldecategory} name={cat} className='peer sr-only' />
                                    <div className='w-4 h-4 rounded border border-white/20 bg-white/[0.04] peer-checked:bg-violet-600 peer-checked:border-violet-500 transition-all duration-200' />
                                </div>
                                <span className='text-slate-400 text-sm group-hover:text-white transition-colors duration-200'>
                                    {cat === 'TopWear' ? 'Top Wear' : cat === 'BottomWear' ? 'Bottom Wear' : 'Winter Wear'}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Active filters */}
                {Object.values(category).some(Boolean) && (
                    <div className='mt-4 px-1'>
                        <p className='text-violet-400 text-xs font-medium'>
                            {Object.values(category).filter(Boolean).length} filter{Object.values(category).filter(Boolean).length > 1 ? 's' : ''} active
                        </p>
                        <button
                            onClick={() => setcategory({ Men: false, Women: false, Kids: false, TopWear: false, BottomWear: false, WinterWear: false })}
                            className='text-slate-500 hover:text-red-400 text-xs mt-1 transition-colors duration-200 cursor-pointer'
                        >
                            Clear all
                        </button>
                    </div>
                )}

            </div>

            {/* ── Products Section ── */}
            <div className='flex-1 py-8 px-6 md:px-10 relative z-10'>

                {/* Heading */}
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-1 flex-wrap'>
                        <h1 className='text-2xl md:text-3xl font-bold text-white tracking-tight'>
                            {searchActive ? (
                                <>
                                    Results for{' '}
                                    <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                                        "{searchQuery}"
                                    </span>
                                </>
                            ) : (
                                <>
                                    All{' '}
                                    <span className='bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>
                                        Collections
                                    </span>
                                </>
                            )}
                        </h1>
                        <span className='px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium'>
                            {FilteredProducts?.length || 0} items
                        </span>
                    </div>

                    {/* Search active indicator */}
                    {searchActive && (
                        <p className='text-slate-500 text-xs mt-1'>
                            Searching in: name, category, description
                        </p>
                    )}

                    <div className='h-px w-full bg-gradient-to-r from-violet-500/20 via-white/[0.05] to-transparent mt-4' />
                </div>

                {/* Cards */}
                {FilteredProducts?.length > 0 ? (
                    <div className='flex flex-wrap gap-5'>
                        {FilteredProducts?.map((data) => (
                            <Card
                                key={data._id}
                                image={data.image1}
                                name={data.name}
                                price={data.price}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center h-64 gap-3'>
                        <div className='w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center'>
                            <IoSearchOutline className='w-7 h-7 text-slate-600' />
                        </div>
                        <p className='text-slate-500 text-sm'>
                            {searchActive
                                ? `No results for "${searchQuery}"`
                                : 'No products found'
                            }
                        </p>
                        <p className='text-slate-600 text-xs'>
                            {searchActive ? 'Try a different search term' : 'Try adjusting your filters'}
                        </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Collections