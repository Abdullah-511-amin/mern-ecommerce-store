const express = require('express')
require('dotenv').config()
const cookie_parser = require('cookie-parser')
const Connectdb = require('./Config/db')
const AuthRouter = require('./Routes/AuthRoutes')
const cors = require('cors')
const UserRouter = require('./Routes/UserRoutes')
const ProductRouter = require('./Routes/ProductRoutes')
const OrderRouter = require('./Routes/OrderRoutes')
const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.use(cookie_parser())
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://mern-ecommerce-store-git-main-ownersofstartups.vercel.app',
        'https://mern-ecommerce-store-admin.vercel.app'  // ✅ admin ka URL yahan add karo
    ],
    credentials: true
}))
app.get('/', (req, res) => {
    res.send('Ecommerce site hn ye')
})

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/product', ProductRouter)
app.use('/api/v1', OrderRouter)
app.listen(port, () => {
    console.log('Server Started')
    Connectdb()
})

