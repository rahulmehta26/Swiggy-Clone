import React from 'react'
import { MdStars } from 'react-icons/md'

// eslint-disable-next-line react/prop-types
function DishItemCard({items}) {

  return (

    <>

    <div
              
    className='border-4 border-red-600 min-w-full relative rounded-2xl'
    >

      <img
      
      className=' w-72 h-44 object-cover shadow-lg rounded-2xl'
      src= {"https://media-assets.swiggy.com/swiggy/image/upload/" + items?.cloudinaryImageId} />

      <div
      
      className='bg-gradient-to-t from-black from-5% to-transparent to-40% w-full h-44 rounded-2xl absolute top-0'
      >

        <p
        
        className='absolute bottom-0 text-white text-xl font-bold p-2'
        >{items?.aggregatedDiscountInfoV3?.header + " " + items?.aggregatedDiscountInfoV3?.subHeader}</p>
      </div>

    </div>

    <div
     
     className='p-2'
     >

     <h2
     
     className='text-[#161A1F] line-clamp-1 text-lg font-bold'
     >{items?.name}</h2>

    <div className='flex items-center gap-2'>

     <MdStars className='text-[#1D923C] size-6'/>

     <p 
     
     className='text-[#161A1F] text-base font-semibold'
     >{
      items?.avgRating + " " + items?.sla?.slaString
      }</p>

    </div>
     <p 
     
     className='line-clamp-1 gap-1 text-[#676A6D] text-base font-semibold'
     >{items?.cuisines.join(" ,")}</p>

     <p
     
     className='text-[#676A6D] text-md font-semibold'
     >{items?.locality}</p>

     </div>

    </>


  )
}

export default DishItemCard