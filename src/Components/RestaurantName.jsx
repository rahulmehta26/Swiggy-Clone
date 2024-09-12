/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { MdStars } from 'react-icons/md';
import DishItemCard from './DishItemCard';

function RestaurantName({restaurantData, topAddress}) {

    const [imageScroll, setImageScroll] = useState(0);
    
    const handlePrev = () => {

        imageScroll <= 0 ? '' : setImageScroll((prev) => prev - 70)
      }
  
      const handleNext = () => {
  
        imageScroll >= 490 ? '' : setImageScroll((prev) => prev + 70)
      }      

  return (

    <>
    
    <div 
        
        className='flex items-center justify-between'
        >

            <h1
            
            className='font-[700] text-2xl text-black'
            >{topAddress}</h1>

            <div

            className='flex gap-2'
            >

              <div
              
              style={{
                background: imageScroll === 0 || imageScroll <= 0 ?  '#E9E9EA'  :  '#D8D9DA'
              }}
              className='flex justify-center w-8 h-8 rounded-full'
              >

               <button 
              
              onClick={handlePrev}
              >

                <IoIosArrowRoundBack 
                
                style={{
                 color: imageScroll === 0 || imageScroll <= 0 ?  '#909194'  :  '#23262B'
                 }}
                className='size-[1.7rem] '
                />

              </button>

              </div>

              <div
              
              style={{
                background: imageScroll === 405 || imageScroll >= 405 ?  '#E9E9EA'  :  '#D8D9DA'
              }}
              className='flex justify-center w-8 h-8 rounded-full'
              >

               <button              
               onClick={handleNext}
               >

                <IoIosArrowRoundForward 
                
                style={{
                 color: imageScroll === 405 || imageScroll >= 405 ?  '#909194'  :  '#23262B'
                }}
                className='size-[1.7rem] '
                />

              </button>

              </div>

            </div>

        </div>

        <div

        style={{ translate : `-${imageScroll}%`}}
              
        className='w-72 mt-4 duration-1000 flex gap-8'
        >

         {
            restaurantData &&  restaurantData.map(({info, cta : {link}}, i) => {

            return(
              
              <div            
              
              key={i}
              className=' hover:scale-95 duration-200 cursor-pointer'
              >

                <DishItemCard {...info} link = {link} />

              </div>

              

            )
            })

         }

        </div>

    </>

  )
}

export default RestaurantName