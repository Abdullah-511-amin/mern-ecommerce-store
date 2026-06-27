import React, { useContext } from 'react'
import vcart from '../assets/vcart logo.png'
import { FaGoogle } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { AuthDataContext } from '../Context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utilis/Firebase';
import { UserDataContext } from '../Context/UserContext';
function Login() {

    const [userdata, setuserdata] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const [password, setpassword] = useState(false)

    const { serverurl } = useContext(AuthDataContext)
     const {GetCurrentUser} = useContext(UserDataContext)
    const handlechange = (e) => {
        const { name, value } = e.target;

        setuserdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(serverurl + '/auth/login', userdata, { withCredentials: true })
            GetCurrentUser()
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    const googleSignup = async () => {
        try {
            const res = await signInWithPopup(auth, provider)
            let user = res.user
            let name = user.displayName
            let email = user.email

            const result = await axios.post(serverurl + '/auth/googlelogin', { name, email }, { withCredentials: true })
            GetCurrentUser()
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-white relative flex flex-col justify-center items-center'>
            <div className='absolute top-6 left-3 md:top-6 md:left-6 flex justify-center items-center gap-2'>
                <img src={vcart} alt="" className='h-10 md:14' />
                <h1>OneCart</h1>
            </div>
            <div className='flex flex-col justify-center items-center gap-1 mb-6'>
                <h1 className='text-2xl font-medium'>Registration Page</h1>
                <p className='text-[15px] md:text-md text-white/90'>Welcome to OneCart, Place your order</p>
            </div>
            <div className='w-[85%] min-h-[50%] cursor-pointer   bg-[#00011125] gap-2 py-5 md:py-6 max-w-xl flex justify-start items-center flex-col shadow-lg rounded-lg'>
                <div className='w-[80%] bg-[#42656cae] gap-2 max-w-75 p-2 rounded-full shadow-lg hover:scale-105 transition-all flex justify-center items-center' onClick={googleSignup}>
                    <FaGoogle />
                    <p>Login with google</p>
                </div>
                <p className='text-lg font-medium text-white '>OR</p>
                <form className='flex flex-col justify-center items-center gap-7 w-full' onSubmit={handlesubmit}>

                    <input type="text" placeholder='Enter Email..' name='email' className='p-2 rounded-lg border border-white/60 w-[85%] max-w-2xl outline-none' onChange={handlechange} />
                    <div className='relative w-[85%]'>
                        <input
                            type={password ? 'text' : 'password'}
                            name='password'
                            onChange={handlechange}
                            placeholder="Enter Password.."
                            className="p-2 rounded-lg border border-white/60 w-full outline-none pr-10"
                        />

                        <IoEyeOutline
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
                            onClick={() => setpassword((prev) => !prev)} />
                    </div>
                    <button className='w-[85%] cursor-pointer max-w-75 bg-violet-500 hover:bg-violet-600 hover:scale-105 transition-all text-white rounded-full shadow-lg p-2'>Login Account</button>
                </form>
                <p className='text-md font-medium text-white mt-2'>Want an new account? <Link to={'/registration'}><span className='text-violet-500 cursor-pointer px-1'>Signup</span></Link></p>
            </div>
        </div>
    )
}

export default Login