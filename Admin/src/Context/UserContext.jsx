import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'
import { useEffect } from 'react'
export const AdminDataContext = createContext()
function UserContext({children}) {
    let [admindata,setadmindata] = useState(null)
    let {serverurl} = useContext(AuthDataContext)

    const GetCurrentAdmin = async () => {
        try {
            const res = await axios.get(serverurl + '/user/currentadmin',{withCredentials:true})
            setadmindata(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
            setadmindata(null)
        }
    }

    useEffect(() => {
        GetCurrentAdmin()
    },[])
    const value = {
        admindata,setadmindata,
        GetCurrentAdmin
    }
  return (
    <AdminDataContext.Provider value={value}>
        {children}
    </AdminDataContext.Provider>
  )
}

export default UserContext