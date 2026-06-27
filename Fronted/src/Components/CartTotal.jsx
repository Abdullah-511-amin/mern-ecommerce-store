import React, { useContext } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

function CartTotal({ showButton = true }) {

    const { cartdata } = useContext(ShopDataContext)

    const subtotal = cartdata?.reduce(
        (total, item) =>
            total + (item.productId.price * item.quantity),
        0
    ) || 0

    const deliveryfee = 100

    const total = subtotal > 0
        ? subtotal + deliveryfee
        : 0

    return (
        <>
            <div className='w-full max-w-sm border border-white/80 rounded-lg shadow-lg p-5 flex flex-col gap-5'>

                <h1 className='text-xl font-semibold text-white'>
                    Cart Total
                </h1>

                <div className='flex justify-between items-center'>
                    <p className='text-white/70'>Subtotal</p>
                    <p className='text-white'>Rs {subtotal}</p>
                </div>

                <div className='flex justify-between items-center'>
                    <p className='text-white/70'>Delivery Fee</p>
                    <p className='text-white'>Rs {deliveryfee}</p>
                </div>

                <hr className='border-white/20' />

                <div className='flex justify-between items-center'>
                    <p className='text-lg font-semibold text-white'>
                        Total
                    </p>
                    <p className='text-lg font-semibold text-violet-400'>
                        Rs {total}
                    </p>
                </div>

            </div>

            {
                showButton && subtotal > 0 && (
                    <Link to='/placeorder'>
                        <button className='bg-violet-600 text-white/90 w-full max-w-sm p-2 mt-4 rounded-lg shadow-lg'>
                            PROCEED TO CHECKOUT
                        </button>
                    </Link>
                )
            }
        </>
    )
}

export default CartTotal