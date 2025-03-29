import React,{useState} from 'react'
import axios from 'axios'
import { backend_url } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
// import { ShopContext } from '../../../frontend/src/context/ShopContext'
const Login = ({setToken}) => {
    
const[email,setemail] = useState('')
const[password,setpassword] = useState('')


  const onSubmitHandler = async (e) =>{
    try{
e.preventDefault();
const response = await axios.post(`${backend_url}/api/user/admin`, { email, password });
console.log(response)
if (response.data.token) {
  console.log("Token received:", response.data.token);
  localStorage.setItem("token", response.data.token);  // ✅ Store token in localStorage
  console.log("Token saved:", localStorage.getItem("token"));
} else {
  toast.error(response.data.message)
}
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
<form onSubmit={onSubmitHandler} className='  flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
  <div className=' gap-2  mt-10 '>
    <p className=' text-2xl mb-4 font-bold'> Admin Panel</p>
</div>
  
  <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" className=' w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
  <input onChange={(e)=>setpassword(e.target.value)} value={password}  type="password" className=' w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
  <div className=' w-full flex justify-between text-sm'>
    
    
  </div>
  <button onClick={onSubmitHandler} type= "Submit" className=' w-full  py-2 px-4 rounded-md text-white bg-black'>Login</button>
        </form>
      
    );
  }
  
  

export default Login
