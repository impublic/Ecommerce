import React, { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const  backend_url = import.meta.env.VITE_BACKEND_URL;
  console.log(backend_url)


  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const[products,setproducts]=useState([])
  const[token,setToken]=useState('')

  const navigate = useNavigate();

  const AddToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if(token){
      try{
        await axios.post( backend_url + '/api/cart/add',{itemId,size},{headers:{token}})
      } catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getCartCount = () => {
    let TotalCount = 0;
    for (const items in cartItems) {
      console.log("The items is ", items);
      for (const item in cartItems[items]) {
        //  console.log("The item is",item)
        if (cartItems[items][item] > 0) {
          // console.log("The quantity is ",cartItems[items][item])
          TotalCount += cartItems[items][item];
          // console.log("The total count is",TotalCount)
        }
      }
    }
    return TotalCount;
  };
  const updateQuantity =async(itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if(token){
      try{
        await axios.post(backend_url +'/api/cart/update',{itemId,size,quantity},{headers:{token}})
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  }

  const getCartAmount=()=>{
let TotalAmount = 0;
for( const items in cartItems){
let iteminfo = products.find((product)=>product._id === items)
for(const item in cartItems[items]){
  try {
if(cartItems[items][item] > 0){
  TotalAmount +=  iteminfo.price * cartItems[items][item]
}
  } catch (error){

  }
}
}
return TotalAmount;
  }
const getProductsData = async ()=>{
  try{
const response = await axios.get(backend_url + '/api/product/list')
console.log(response.data)
if(response.data.success){
  setproducts(response.data.products)
}else{
  toast.error(response.data.message)
}
  }catch(error){
console.log(error)
toast.error(error.message)
  }
}
const getUserData =async(token) =>{
try{
const response = await axios.post('/api/cart/get',{},{headers:{token}})
console.log("The getcart is",response)
if(response.data.success){
  setCartItems(response.data.cartData)
}
}catch(error){
console.log(error)
toast.error(error.message)
}
}
useEffect(()=>{
getProductsData()
},[])

useEffect(()=>{
if(!token && localStorage.getItem('token')){
  setToken(localStorage.getItem('token'))
  getUserData(localStorage.getItem('token'))
}
},[])
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    AddToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backend_url,setCartItems,
    navigate,token,setToken
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
