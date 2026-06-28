import React from 'react'
import { createContext } from 'react'
export const AuthDataContext = createContext()
function AuthContext({ children }) {
  const serverurl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
  let value = {
    serverurl
  }
  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  )
}

export default AuthContext