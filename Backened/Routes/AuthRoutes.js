const express = require('express')
const { Register, Login, Logout, GoogleLogin, adminLogin } = require('../Controllers/AuthController')
const AuthRouter = express.Router()

AuthRouter.post('/registration',Register)
AuthRouter.post('/login',Login)
AuthRouter.post('/googlelogin',GoogleLogin)
AuthRouter.get('/logout',Logout)
AuthRouter.post('/adminlogin',adminLogin)
module.exports = AuthRouter