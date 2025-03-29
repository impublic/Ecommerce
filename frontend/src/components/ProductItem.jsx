import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import{Link} from 'react-router-dom'
const ProductItem = ({id,name,image,price}) => {
    const{currency}=useContext(ShopContext)
  return (
    <div>
      <Link className='cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-100 transiton ease-in-out' src={image[0]} alt=""/>
      </div>
      <p className='text-gray-700 py-1 font-medium'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>
    </div>
  )
}

export default ProductItem
