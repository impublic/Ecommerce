import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets';
const Contact = () => {
  return (
    <div>

      <div className='text-2xl pt-10 text-center border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img}/>
        <div className='flex flex-col gap-6 justify-center items-start'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>3775 North Del Rosa Avenue,San Bernardino County <br/>San Bernardino,California,USA</p>
          <p className='text-gray-500'> Tel:(420) 565-0053 <br/> Email:admin@forever.com</p>
          <p className='text-gray-600 font-semibold text-xl'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black hover:bg-black hover:text-white text-sm px-8 py-4 transition-all duration-700'>Explore jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
