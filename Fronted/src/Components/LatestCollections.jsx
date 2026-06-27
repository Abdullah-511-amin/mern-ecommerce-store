import React, { useContext } from 'react'
import Title from './Title'
import { ShopDataContext } from '../Context/ShopContext'
import Card from './Card'
import { Link } from 'react-router-dom'

function LatestCollections() {

    const { products, AddtoCart } = useContext(ShopDataContext)

    return (
        <div className='py-20 flex flex-col items-center'>

            <div className='w-full text-center mb-10'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='text-slate-400 text-sm md:text-base px-4 mt-2'>
                    Step into Style — New Collections Dropping This Season!
                </p>
            </div>

            <div className='w-[90%] max-w-7xl flex justify-center items-start flex-wrap gap-5'>

                {products?.map((data) => (

                    <Link
                        to={`/product/${data._id}`}
                        key={data._id}
                    >
                        <Card
                            image={data.image1}
                            name={data.name}
                            price={data.price}
                            onAddToCart={() =>
                                AddtoCart(
                                    data._id,
                                    data.sizes?.[0]
                                )
                            }
                        />
                    </Link>

                ))}

            </div>

        </div>
    )
}

export default LatestCollections