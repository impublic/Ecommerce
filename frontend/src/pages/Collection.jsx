import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const{products,search,showSearch}= useContext(ShopContext)
  const[showFilter,setShowFilter]= useState(false);
  const[filterProducts,setFilterProducts]= useState([]);
  const[category,setcategory] = useState([]);
  const[subCategory,setSubCategory] = useState([]);
  const[sortType,setSortType]=useState('relavant');

  const toogleCategory = (e)=>{
if(category.includes(e.target.value)){
  setcategory(prev=> prev.filter(item=> item !== e.target.value))
}else{
  setcategory(prev=> [...prev,e.target.value])
}
  }

//   const subtoogleCategory = (e) => {
//     if(subCategory.includes(e.target.value)){
//       setSubCategory(prev=> prev.filter(item =>item !== e.target.value))
//   }else{
//     setSubCategory(prev=> [...prev,e.target.value])
//   }
// }
const subtoogleCategory = (e) => {
  console.log("SubCategory Clicked:", e.target.value);
  if (subCategory.includes(e.target.value)) {
    setSubCategory(prev => prev.filter(item => item !== e.target.value));
  } else {
    setSubCategory(prev => [...prev, e.target.value]);
  }
};

const applyfilter = () => {
  // console.log("Product SubCategories:", productCopy.map(item => item.subCategory));

  let productCopy = products.slice();
  console.log("🔹 Original Products:", products);
  console.log("🔹 Selected Category:", category);
  console.log("🔹 Selected SubCategory:", subCategory)
  if(showSearch && search){
    productCopy= productCopy.filter(item =>item.name.toLowerCase().includes(search.toLowerCase()))
  }

  if(category.length > 0) {
    productCopy = productCopy.filter((item) => {
     return category.includes(item.category);
    });
  }

  // if (subCategory.length > 0) {
  //   productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
  // }
  if (subCategory.length > 0) {
    console.log("🔹 Applying SubCategory Filter:", subCategory);
  
    productCopy = productCopy.filter(item => 
      item.subCategory && subCategory.includes(item.subCategory.toLowerCase().trim()) // Normalize case & spaces
    );
  
    console.log("✅ Filtered Products After SubCategory Filter:", productCopy);
  }
  
  

  console.log("Filtered Products:", productCopy);
  setFilterProducts(productCopy);
}

const sortProduct = ()=>{
  let fpcopy = filterProducts.slice()
  switch(sortType){
    case 'low-high':
      setFilterProducts(fpcopy.sort((a,b)=>(a.price - b.price)));
      break;
      case 'high-low':
        setFilterProducts(fpcopy.sort((b,a)=>(b.price - a.price)));
        break;
default:
  applyfilter();
  break;
  }
}

  //   useEffect(()=>{
  //  setFilterProducts(products);
  //   },[])

  // useEffect(()=>{
  //    console.log(subCategory)
  //  },[subCategory])

      // useEffect(()=>{
      //   applyfilter();
      // },[category,subcategory])

      useEffect(() => {
        console.log("Selected Category:", category);
        console.log("Selected SubCategory:", subCategory);
        applyfilter();
      }, [category, subCategory, search, showSearch, products]);
      

useEffect(()=>{
sortProduct();
},[sortType])
    
    
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filters */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2  text-xl flex items-center cursor-pointer gap-2'>Filters
          <img className={`h-3 sm:hidden ${showFilter? 'rotate-90':''}`}src={assets.dropdown_icon} alt=""/>
        </p>

        {/* category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className=' flex gap-2'>
            <input className='w-3' type="checkbox" value={'Men'}onChange={toogleCategory}></input>Men</p>
            <p className=' flex gap-2'>
            <input className='w-3' type="checkbox" value={'women'}onChange={toogleCategory}></input>women</p>
            <p className=' flex gap-2'>
            <input className='w-3' type="checkbox" value={'kids'}onChange={toogleCategory}></input>kids</p>
          </div>
        </div>
        {/* subcategory */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className=' flex gap-2'>
            <input className='w-3' type="checkbox" value={'Topwear'}onChange={subtoogleCategory}></input>Topwear</p>
            <p className=' flex gap-2'>
            <input className='w-3' type="checkbox" value={'Bottomwear'}onChange={subtoogleCategory}></input>Bottomwear</p>
            <p className=' flex gap-2'>
            <input className='w-3' type="checkbox" value={'Winterwear'}onChange={subtoogleCategory}></input>Winterwear</p>
          </div>
        </div>
</div>
{/* Right side */}
<div className='flex-1'>
  <div className=' flex justify-between text-base sm:text-2xl mb-4'>
    <Title text1={'All'} text2={'COLLECTION'}/>
    <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
      <option value ="relavant">Sort by:Relavant</option>
      <option value="low-high">Sort by:Low to High</option>
      <option value="high-low">Sort by:High to Low</option>
    </select>
  </div>
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
    {
      filterProducts.map((item,index)=>(
<ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
      ))
    }
  </div>
</div>
    </div>
  )
}

export default Collection
