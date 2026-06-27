import { Route, Routes, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Registration from "./Pages/Registration"
import Login from "./Pages/Login"
import Collections from "./Pages/Collections"
import Navbar from "./Components/Navbar"
import About from "./Pages/About"
import DetailPage from "./Pages/DetailPage"
import Contact from "./Pages/Contact"
import AddtoCart from "./Pages/AddtoCart"
import PlaceOrder from "./Pages/PlaceOrder"
import MyOrders from "./Pages/MyOrders"
import VirtualAssistant from "./Components/VirtualAssistant"
import { useContext } from "react"
import { UserDataContext } from "./Context/UserContext"

// ── Protected route — redirect to /login if not logged in
function ProtectedRoute({ children }) {
  const { currentuserdata } = useContext(UserDataContext)
  return currentuserdata ? children : <Navigate to="/login" replace />
}

// ── Guest route — redirect to / if already logged in
function GuestRoute({ children }) {
  const { currentuserdata } = useContext(UserDataContext)
  return !currentuserdata ? children : <Navigate to="/" replace />
}

function App() {

  return (
    <>
      <Navbar />
      <VirtualAssistant />
      <Routes>

        {/* ── Public routes (only for guests) ── */}
        <Route path="/registration" element={<GuestRoute><Registration /></GuestRoute>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />

        {/* ── Protected routes (login required) ── */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/collections" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><AddtoCart /></ProtectedRoute>} />
        <Route path="/placeorder" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

        {/* ── 404 fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  )
}

export default App