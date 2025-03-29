import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import { backend_url,currency } from '../App';
import{toast} from 'react-toastify'
import { assets } from '../assets/assets';
const Orders = ({token}) => {
  const[orders,setorders]=useState([])
  const fetchAllOrders = async ()=>{
if(!token){
  return null;
}
try{
const response = await axios.post(backend_url +'/api/order/list',{},{headers:{token}})
console.log(response.data)
if(response.data.success)
{
  setorders(response.data.orders)
}else{
  toast.error(response.data.message)
}
}catch(error){
toast.error(error.message)
}
  }
  const statushandler = async  (event,orderId)=>{
const response = await axios.post(backend_url + '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
console.log(response.data)
if(response.data.success){
  await fetchAllOrders();
}else{
  console.log(error)
  toast.error(response.data.message)
}
  }
  useEffect(()=>{
fetchAllOrders();
  },[token])
  return (
    <>
      <h3>Order Page</h3>
      <div>
        {
        orders.map((order, index) => (
          
          <div  className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-4 md:my-4 text-xs sm:text-sm text-gray-700">

        
            <img className='w-12' src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
            <div>
              {
              order.items.map((item, index) => {
                if(index  === order.items.length - 1){
                  return <p className='py-0.5' key={index}>{item.name}x{item.quantity} <span>{item.size}</span> </p>
                }else{
                  return <p className='py-0.5' key={index}>{item.name}x{item.quantity} <span>{item.size}</span> </p>
                }
                              })}             
                   
</div>
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.LastName}</p>
            <div>
              <p>{order.address.street + ","}</p>
              <p>{order.address.city + "," + order.address.state + " " +order.address.zipcode}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
              
              
              <div>
                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                <p className='mt-3'> Method: {order.paymentMethod}</p>
                <p>payment:{order.payment?'Done':'pending'}</p>
                <p>Date:{new Date(order.date).toLocaleDateString()}</p>
               </div>
<div className='flex items-center gap-4'>
               <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
               <select onChange={(event)=>statushandler(event,order._id)} value={order.status} className='p-2 font-semibold '>
                <option value="order placed">order placed</option>
                <option value="packing">packing</option>
                <option value="Shipped">Shipped</option>
                <option value="out for delivery">out for delivery</option>
                <option value="Delivered">Delivered</option>
               </select>
               </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
