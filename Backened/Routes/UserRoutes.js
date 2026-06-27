
const express = require('express')
const isAuth = require('../Middlewares/isAuth')
const { CurrentUser, CurrentAdmin } = require('../Controllers/UserControllers')
const adminAuth = require('../Middlewares/adminAuth')
const UserRouter = express.Router()

UserRouter.get('/current',isAuth,CurrentUser)
UserRouter.get('/currentadmin',adminAuth,CurrentAdmin)
module.exports = UserRouter

