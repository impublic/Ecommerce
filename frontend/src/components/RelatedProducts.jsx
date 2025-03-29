import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subcategory}) => {
    const{products}=useContext(ShopContext)
    const[Related,setrelated]=useState([]);
    useEffect(()=>{
if(products.length > 0) {
     let productcopy = products.slice();
    productcopy =  productcopy.filter((item)=>category === item.category);
    productcopy = productcopy.filter((item)=>subcategory === item.subcategory);
    console.log(productcopy.slice(0,5))
    setrelated(productcopy.slice(0,5))
}
    },[products])

  return (
    <div>
      <div className=''>
        <Title text1={" RELATED "} text2 ={" PRODUCT "}/>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {Related.map((item,index)=>(
                <ProductItem key ={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
