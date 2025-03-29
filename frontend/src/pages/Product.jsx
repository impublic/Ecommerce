import React, { useContext, useEffect, useState } from 'react';
import { assets, products } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  console.log(productId);
  const {products,currency,AddToCart} = useContext(ShopContext);
  const[productData,setProductData]=useState(false)
  const[image,setImage]=useState('');
  const[size,setsize]=useState('');
  
  const fetchProductData =  async()=>{
products.map((item)=>{
if(item._id === productId){
  setProductData(item)
  setImage(item.image[0]);
console.log(item);
return null;
}
})
}
useEffect(()=>{
fetchProductData();
},[productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product Data */}
      <div className='flex gap-12'>
        {/* product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
          
            <div className=' flex sm:flex-col overflow-x-auto sm:overflow-y-scroll  justify-between sm:justify-normal sm:w-[18.7%] w-full'>
{
  productData.image.map((item,index)=>(
    
     <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
  ))
}
            </div>
            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image}/>
            </div>
          </div>
          {/* product Info */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon}alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_dull_icon} alt="" />
              <p className='pl-6'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className=' flex gap-2'>
                {
                  productData.sizes.map((item,index)=>(
<button onClick={()=>setsize(item)} className={`border px-4 py-2 bg-gray-100 ${item == size?'border-orange-500':''}`}key={index}> {item}</button>
                  ))
                }
              </div>
            </div>
            <button onClick={()=>AddToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className=' mt-8 sm:w-4/5'/>
          <div className='  text-sm text-gray-500 flex flex-col gap-1 mt-5'>
            <p>100% original product</p>
            <p>cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
          </div>
        </div>
        {/* Description Review section */}
        <div className="mt-20">
          <div className='flex gap-3'>
            <b className='border px-5 py-3'>Description</b>
            <p className='border px-5 py-3'>Review (122)</p>
          </div>
          <div className=' flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>Employees are the heart and soul of Amazon, which is why we are proud to provide industry-leading pay and benefits and access to skills training on day one of employment, all in a safe and inclusive workplace. We also advocate on issues that are important to our team and front-line employees across the country.</p>
          <p>Amazon believes the U.S. should welcome the best and the brightest talent from around the world. It's imperative for our country's competitiveness. Amazon has hundreds of thousands of employees in the U.S. from all backgrounds who are dedicated to inventing on behalf of and serving our customers.</p>
          </div>
        </div>

        {/* Realted Products */}
        <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>
      </div>
   
  
  ):<div className='opacity-0'></div>
}

export default Product;
