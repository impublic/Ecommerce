import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js";
// placing order using Cod method
const placeOrders = async(req,res)=>{
try {
const{userId,items,amount,address} = req.body;
const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod:'COD',
    payment:false,
    date:Date.now()
}
const newOrder = new orderModel(orderData)
await newOrder.save()
await userModel.findByIdAndUpdate(userId,{cartData:{}})
res.json({success:true,message:"Order Placed"})
}catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
}
}
// placing orders using a stripe method 
const placeorderStripe = async(req,res)=>{

}
// placing order using Razorpay
const placeorderRazorpay =async(req,res) =>{

}
// All order data for admin panel
const allOrders = async(req,res)=>{
    try{
const orders = await orderModel.find({})
res.json({success:true,orders})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
// user order data for frontend
const userOrders = async(req,res) =>{
try{
const { userId }=req.body
const orders = await orderModel.find({userId})
res.json({success:true,orders})
}catch(error){
console.log(error)
res.json({success:false,message:error.message})
}
}
// update order status for admin panel
const updateStatus =async(req,res)=>{
try{
const{ orderId,status}=req.body;
await orderModel.findByIdAndUpdate(orderId,{status})
res.json({success:true,message:"status updated"})
}catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
}
}

export{updateStatus,userOrders,allOrders,placeorderRazorpay,placeorderStripe,placeOrders}