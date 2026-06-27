import React, { useContext } from 'react'
import Title from '../Components/Title'
import { ShopDataContext } from '../Context/ShopContext'
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthContext';
import CartTotal from '../Components/CartTotal';

function AddtoCart() {

  const { cartdata, setcartdata } = useContext(ShopDataContext)
  const { serverurl } = useContext(AuthDataContext)

  async function handledelete(cartItemId) {

    try {

      const res = await axios.post(
        serverurl + '/product/cart/remove',
        { cartItemId },
        { withCredentials: true }
      );
      console.log(res.data)
      if (res.data.success) {
        setcartdata(res.data.cartData);
      }

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='w-full h-screen relative bg-[#080c18] flex flex-col justify-start items-start'>

      <div className='mt-8 mx-auto'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      <div className='flex flex-col justify-between items-center gap-5 w-full mt-3'>

        {
          cartdata?.map((data) => (

            <div
              key={data._id}
              className='flex justify-center items-center w-[83%] max-w-3xl px-4 bg-zinc-500 rounded-lg shadow-lg p-2'
            >

              <div className='flex justify-center items-center gap-3'>

                <img
                  src={data.productId.image1}
                  alt=""
                  className='w-20 h-20 rounded-lg object-cover'
                />

                <div>
                  <h1 className='text-xl font-medium text-white/90'>
                    {data.productId.name}
                  </h1>

                  <div className='flex justify-center items-center gap-2'>

                    <p className='text-md font-medium text-white/60'>
                      Rs : {data.productId.price}
                    </p>

                    <div className='w-10 h-10 rounded-xl bg-zinc-500 text-white/60 border border-zinc-300 flex p-2 justify-center items-center'>
                      <p className='text-md font-medium text-white/70'>
                        {data.size}
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              <div className='flex justify-center items-center mx-auto my-auto'>
                <input
                  type="number"
                  min={1}
                  value={data.quantity}
                  readOnly
                  className='bg-white w-14 h-10 text-center rounded-md outline-none'
                />
              </div>

              <div>
                <MdDeleteForever
                  className='text-2xl font-medium cursor-pointer text-red-500'
                  onClick={() => handledelete(data._id)}
                />
              </div>

            </div>

          ))
        }

      </div>
      <div className='absolute w-full bottom-[17%] left-10'>
        <CartTotal />
      </div>
    </div>
  )
}

export default AddtoCart