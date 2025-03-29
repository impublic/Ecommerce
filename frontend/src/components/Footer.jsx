import React from 'react'
import {assets} from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
     <div>
        <img src={assets.logo}/>
        <p className='w-full md:w-2/3 text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
     </div>

     <div>
      <p className='text-xs font-medium mb-5'>COMPANY</p>
      <ul className='flex flex-col gap-1 text-gray-600'>
        <li>HOME</li>
        <li>ABOUT US</li>
        <li>Delivery</li>
        <li>privacy policy</li>
      </ul>
</div>


<div>
  <p className='text-x1 font-medium mb-5'>GET IN TOUCH</p>
  <ul className='flex flex-col gap-1 text-gray-600'>
    <li className='text-gray-500'> +1 212-456-7890</li>
    <li className='text-blue-600 underline'>contact@amazon.com</li>
  </ul>
</div>

<div>
  <hr/>
  <p className='text-sm py-5 text-center'>copyright@2024amazon.com-All Rights Reserved</p>
</div>

    </div>
  )
}

export default Footer
