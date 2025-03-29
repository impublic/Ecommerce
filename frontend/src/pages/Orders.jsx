import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
const Orders = () => {
    
  const {backend_url,token,currency,products}=useContext(ShopContext)
  const[ordersData,setOrdersData]=useState([])
  const loadOrderData =async()=>{
    try{
if(!token){
  return null;
}
const response = await axios.post(backend_url + '/api/order/userOrders',{},{headers:{token}})
console.log(response.data)
if(response.data.success){
let allOrderItem = []
response.data.orders.map((order)=>{
  order.items.map((item)=>{
    item['status']=order.status
    item['payment']=order.payment
    item['paymentMethod']=order.paymentMethod
    item['date']=order.date
    allOrderItem.push(item)

})
})
console.log(allOrderItem)
setOrdersData(allOrderItem.reverse())
}
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }
useEffect(()=>{
loadOrderData()
},[token])
  return (
    <div className='border-t'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'Orders'}/>
      </div>

      <div>
        {
          ordersData.slice(1,4).map((item,index)=>(
<div key={index} className='text-gray-700 py-4 flex flex-col md:flex-row md:items-center md:justify-between'>
<div className='flex items-start gap-6 text-sm'>
  <img className='w-16 sm:w-20' src={item.image[0]} alt=""/>
 
  <div>
    <p className='sm:text-base font-medium'>{item.name}</p>
    
    <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
      <p>{currency}{item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <p className='text-lg'>Size: {item.size}</p>
      </div>
      <p className=' mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
      <p className=' mt-1'>payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
      </div>
  </div>
  {/* Ready to ship Track order */}
  <div className='md:w-1/2 flex justify-between'>
    <div className='flex items-center gap-2'>
      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
      <p className='text-sm  md:text-base'>{item.status}</p>
      </div>
      <button onClick={loadOrderData} className=' border px-4 py-2 text-sm font-medium rounded'>Track Order</button>
    </div>
  </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders
