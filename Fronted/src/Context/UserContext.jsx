import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
import { AuthDataContext } from './AuthContext'
import { useEffect } from 'react'
import { useState } from 'react'
export const UserDataContext = createContext()
function UserContext({ children }) {
    const { serverurl } = useContext(AuthDataContext)
    const [currentuserdata, setcurrentuserdata] = useState(null)



    const GetCurrentUser = async () => {
        try {
            const res = await axios.get(serverurl + '/user/current', { withCredentials: true })
            setcurrentuserdata(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        currentuserdata,
        setcurrentuserdata,
        GetCurrentUser
    }
    useEffect(() => {
        GetCurrentUser()
    }, [])
    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext