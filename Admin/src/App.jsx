import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Add from './Pages/Addhn'
import Lists from './Pages/Lists'
import Orders from './Pages/Orders'
import Login from './Pages/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import Layout from './Components/Layout'

function App() {
  return (
    <Routes>

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path='/add'
        element={
          <ProtectedRoute>
            <Layout>
              <Add />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/lists'
        element={
          <ProtectedRoute>
            <Layout>
              <Lists />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/orders'
        element={
          <ProtectedRoute>
            <Layout>
              <Orders />
            </Layout>
          </ProtectedRoute>
        }
      />

    

      <Route path='/login' element={<Login />} />

    </Routes>
  )
}

export default App