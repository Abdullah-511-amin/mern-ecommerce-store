import React, { createContext } from 'react'
export const AuthDataContext = createContext()

function AuthContext({ children }) {
    const serverurl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
    console.log(serverurl)
    console.log("API URL:", serverurl) // ✅ ye line add karo check ke liye

    const value = { serverurl }
    return (
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
    )
}

export default AuthContext