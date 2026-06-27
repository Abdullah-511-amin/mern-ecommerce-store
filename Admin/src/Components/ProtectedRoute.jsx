import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AdminDataContext } from '../Context/UserContext'

function ProtectedRoute({ children }) {

    const { admindata } = useContext(AdminDataContext)

    if (!admindata) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute