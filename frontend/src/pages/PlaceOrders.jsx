import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrders = () => {
  const [method, setmethod] = useState("cod");
  const { navigate, backend_url,setCartItems,cartItems,token,getCartAmount,delivery_fee,products } = useContext(ShopContext);
  const[formdata,setformdata]=useState({
    firstName:'',
    LastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })
  const onChangeHandler =(event)=>{
const name = event.target.name
const value = event.target.value
setformdata(data => ({...data,[name]:value}))
  }
  const onSubmitHandler = async(event)=>{
event.preventDefault();
try{
let orderItems = []
for(const items in cartItems){
  for(const item in cartItems[items]){
    if(cartItems[items][item]> 0){
const itemInfo = structuredClone(products.find(product=>product._id === items))
if(itemInfo){
  itemInfo.size= item
  itemInfo.quantity= cartItems[items][item]
  orderItems.push(itemInfo)
}
    }
    }
  }
console.log(orderItems);
let orderdata = {
  address:formdata,
  items:orderItems,
  amount:getCartAmount() + delivery_fee
}
switch(method){
  case 'cod' :
const response = await axios.post(backend_url + '/api/order/place',orderdata,{headers:{token}})
console.log(response.data)
if(response.data.success){
  setCartItems({})
  navigate("/orders")
}else{
  toast.error(response.data.message)
}
  default:
    break;
}
}catch(error){
  console.log(error)
  toast.error(error.message)
}
  }
  return (
    <form onSubmit={onSubmitHandler} className=" flex flex-col gap-4 sm:flex-row pt-5 sm:pt-14 justify-between min-h-[80px]">
      {/* Left Side */}
      <div className=" flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={" DELIVERY "} text2={" INFORMATION "} />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formdata.firstName}
            className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input required  onChange={onChangeHandler} name='LastName' value={formdata.LastName}
            className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formdata.email}
          className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input required onChange={onChangeHandler} name='street' value={formdata.street} 
          className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
          type="text"
          placeholder="street"
        />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formdata.city} 
            className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="city"
          />
          <input required onChange={onChangeHandler} name='state' value={formdata.state} 
            className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="state"
          />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formdata.zipcode} 
            className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input required onChange={onChangeHandler} name='country' value={formdata.country} 
            className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
            type="text"
            placeholder="country"
          />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formdata.phone} 
          className="border border-gray-600 rounded px-3.5 py-1.5 w-full"
          type="number"
          placeholder="phone"
        />
      </div>

      {/* Right side */}
      <div className="mt-8 ">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={" PAYMENT "} text2={" METHOD "} />
          {/* payment mode  */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setmethod("stripe")}
              className="flex items-center p-2 gap-3 border px-3  cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-800" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} />
            </div>

            <div
              onClick={() => setmethod("razorpay")}
              className="flex items-center p-2 gap-3 border px-3  cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-800" : ""
                }`}
              ></p>

              <img className="h-5 mx-4" src={assets.razorpay_logo} />
            </div>

            <div
              onClick={() => setmethod("cod")}
              className="flex items-center p-2 gap-3 border px-3  cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-800" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm  font-medium mx-4 ">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8 ">
            <button type='submit'
              // onClick={() => navigate("/Orders")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              Place An Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrders;
