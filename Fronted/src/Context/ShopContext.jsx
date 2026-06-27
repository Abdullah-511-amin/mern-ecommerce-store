import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'
import { UserDataContext } from './UserContext'
export const ShopDataContext = createContext()
function ShopContext({ children }) {
    const [products, setproducts] = useState([])
    const { serverurl } = useContext(AuthDataContext)
    const [cartdata, setcartdata] = useState(null)
    const [searchQuery, setsearchQuery] = useState('')
    const [searchActive, setsearchActive] = useState(false)
    let currency = 'Rs'
    let deliveryfee = 100

    const GetProducts = async () => {
        try {
            const res = await axios.get(
                serverurl + '/product/all',
                { withCredentials: true }
            )

            setproducts(res.data.products)

            return res.data.products
        } catch (error) {
            console.log(error)
        }
    }

    const AddtoCart = async (productId, size) => {
        try {
            const res = await axios.post(serverurl + '/product/addtocart', { productId, size }, { withCredentials: true })
            if (res.data.success) {
                alert(res.data.message);
                GetCartData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const GetCartData = async () => {
        try {
            const res = await axios.get(serverurl + '/product/carts', { withCredentials: true })
            setcartdata(res.data.cartData)
        } catch (error) {

            console.log(error)
        }
    }
    useEffect(() => {
        GetProducts()
        GetCartData()
    }, [])
    const value = {
        products,
        setproducts,
        GetProducts,
        AddtoCart,
        cartdata,
        setcartdata,
        searchQuery,
        setsearchQuery,
        searchActive,
        setsearchActive,
    }
    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    )
}

export default ShopContext