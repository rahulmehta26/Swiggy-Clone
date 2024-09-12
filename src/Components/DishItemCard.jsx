import React from 'react'
import { MdStars } from 'react-icons/md'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function DishItemCard(info) {

  return (

    <>

    <Link to={`/foodInfo/${info?.link?.split('/')[5]}`}>

       <div
              
    className='w-72 h-44 relative'
    >

      <img

      className=' w-full h-full object-cover shadow-lg rounded-2xl'
      src= {"https://media-assets.swiggy.com/swiggy/image/upload/" + info?.cloudinaryImageId} />

      <div
      
      className='bg-gradient-to-t from-black from-5% to-transparent to-40% w-full h-full rounded-2xl absolute top-0'
      >

        <p
        
        className='absolute bottom-0 text-white text-xl font-bold p-2'
        >{  info?.aggregatedDiscountInfoV3 ? info?.aggregatedDiscountInfoV3?.header + " " + info?.aggregatedDiscountInfoV3?.subHeader : ""}</p>
      </div>

       </div>

       <div
     
     className='p-2'
     >

     <h2
     
     className='text-[#161A1F] line-clamp-1 text-lg font-bold'
     >{info?.name}</h2>

    <div className='flex items-center gap-2'>

     <MdStars className='text-[#1D923C] size-6'/>

     <p 
     
     className='text-[#161A1F] text-base font-semibold'
     >{
      info?.avgRating + " " + info?.sla?.slaString
      }</p>

    </div>
     <p 
     
     className='line-clamp-1 gap-1 text-[#676A6D] text-base font-semibold'
     >{info?.cuisines?.length > 0 ? info?.cuisines?.join(", ") : " "}</p>

     <p
     
     className='text-[#676A6D] text-md font-semibold'
     >{info?.locality}</p>

       </div>

    </Link>


    </>


  )
}

export default DishItemCard