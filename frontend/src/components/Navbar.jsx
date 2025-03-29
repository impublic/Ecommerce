import React, { useContext } from 'react'
import { assets } from "../assets/assets";
import { Link,NavLink } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {
        const[visible,setvisible]=useState(false)
        const{setShowSearch,getCartCount,navigate,token,setToken,setCartItems}= useContext(ShopContext)
        const logout = ()=>{
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        navigate('/login')
        }
  return (
   <div className='flex items-center justify-between font-medium py-5'> 
      <Link to ="/"><img src={assets.logo} className='w-36'/></Link>
      <ul className=' hidden sm:flex text-sm text-gray-700 gap-5'>
        <NavLink to ='/' className= 'flex flex-col items-center gap-1'>
<p>HOME</p>
<hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to ='/collection' className= 'flex flex-col items-center gap-1'>
<p>COLLECTION</p>
<hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden'/>
        </NavLink>

        <NavLink to ='/about' className= 'flex flex-col items-center gap-1'>
<p>ABOUT</p>
<hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden '/>
        </NavLink>

        <NavLink to ='/contact' className= 'flex flex-col items-center gap-1'>
<p>CONTACT</p>
<hr className='w-2/4 h-[1.5px] border-none bg-gray-700 hidden '/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)}  className='w-5 cursor pointer' src = {assets.search_icon} alt =""/>
        <div className='group relative'>
               <img onClick={()=>token ? null: navigate('/login')} className='w-5 cursor pointer' src = {assets.profile_icon}alt="" />
                {/* Dropdown menu */}
                {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
<div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
        <p className='cursor-pointer hover:text-black'>My Profile</p>
        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
</div>
                </div>}
        </div>
       <Link to = '/cart' className='relative'>
       <img src = {assets.cart_icon} className='w-5 min-w-5' alt=''/>
       <p className=' absolute right-[-5px] bottom-[-5px] w-4 leading-4 text-center bg-black text-white  aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
       </Link>
       <img onClick={()=>setvisible(true)} src = {assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=""/>
      </div>
{/* sidebar menu for small screen */}
 <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ?'w-full':'w-0'}`}>
     <div className='flex flex-col text-gray-600'>
        <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
<img className='h-4 rotate-180' src={assets.dropdown_icon} alt = ""/>
     <p>Back</p>
     </div>
     <NavLink onClick={()=>setvisible(false)} to="/" className='py-2 pl-6 border'>HOME</NavLink>
     <NavLink onClick={()=>setvisible(false)} to="/collection"  className='py-2 pl-6 border'>COLLECTION</NavLink>
     <NavLink onClick={()=>setvisible(false)} to="/about" className='py-2 pl-6 border'>ABOUT</NavLink>
     <NavLink onClick={()=>setvisible(false)}to="/contact" className='py-2 pl-6 border'>CONTACT</NavLink>
     </div>
 </div>
    </div>
    
  )
}

export default Navbar
