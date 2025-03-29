import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className=' my-10 flex flex-col gap-16 md:flex-row'>
        <img  className=' w-full md:max-w-[450px]'src={assets.about_img}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a 1st-century BC text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical and improper Latin. The first two words themselves are a truncation of dolorem ipsum ("pain itself").</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our Mission at Forever is to empower customer with choices convenience,and confidence.we're dedicated to providing a seamless shopping experience that exceeds expectations from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Title text1={' why '} text2={' choose us '}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assuarance</b>
          <p className='text-gray-600'>We always update our info on producers that are new and The factories are assessed by us Concerning product Scope, quality of This Merchandise created, manufacturing capacity, amenities, fiscal capacity, technology orientation, person power conditions, managerial efficiency, and quality policy</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We always update our info on producers that are new and The factories are assessed by us Concerning product Scope, quality of This Merchandise created, manufacturing capacity, amenities, fiscal capacity, technology orientation, person power conditions, managerial efficiency, and quality policy</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>We always update our info on producers that are new and The factories are assessed by us Concerning product Scope, quality of This Merchandise created, manufacturing capacity, amenities, fiscal capacity, technology orientation, person power conditions, managerial efficiency, and quality policy</p>
        </div>
</div>
<NewsLetterBox/>
    </div>
  )
}

export default About
