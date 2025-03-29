import express from 'express'
import{updateStatus,userOrders,allOrders,placeorderRazorpay,placeorderStripe,placeOrders}from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router()
// Admin Feature
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment Feature
orderRouter.post('/place',authUser,placeOrders)
orderRouter.post('/stripe',authUser,placeorderStripe)
orderRouter.post('/razorpay',authUser,placeorderRazorpay)

// user Feature
orderRouter.post('/userOrders',authUser,userOrders)

export default orderRouter
