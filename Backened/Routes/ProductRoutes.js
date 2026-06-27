const express = require('express')
const adminAuth = require('../Middlewares/adminAuth')
const isAuth = require('../Middlewares/isAuth')
const upload = require('../Middlewares/multer')
const { AddProduct, ListProduct, RemoveProduct, AddtoCart, GetCartData, RemoveCart } = require('../Controllers/ProductController')
const ProductRouter = express.Router()
ProductRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]),AddProduct)
ProductRouter.post('/addtocart' , isAuth,AddtoCart)
ProductRouter.get('/carts' , isAuth,GetCartData)
ProductRouter.post('/cart/remove', isAuth, RemoveCart);
ProductRouter.get('/all',adminAuth,ListProduct)
ProductRouter.delete('/remove/:id',adminAuth,RemoveProduct)
module.exports = ProductRouter