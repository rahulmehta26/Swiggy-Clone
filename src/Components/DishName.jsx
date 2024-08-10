import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

// eslint-disable-next-line react/prop-types
function DishName({dishNameData}) {

    // const [imageData, setImageData] = useState([])

    const [imageScroll, setImageScroll] = useState(0);

    // const fetchData = async() => { 
  
    //   const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
  
    //   const response = await data.json()

    //   const result = response?.data?.cards[0]?.card?.card?.imageGridCards?.info
  
    //   // console.log(result)

    //   setImageData(result)
  
    // }
  
    // useEffect(() => {
  
    //   fetchData()
  
    // }, [])

    // console.log(dish_result)

    const handlePrev = () => {

      imageScroll <= 0 ? '' : setImageScroll((prev) => prev - 32)
    }

    const handleNext = () => {

      imageScroll >= 185 ? '' : setImageScroll((prev) => prev + 32)
    }

  return (

    <>

        <div 
        
        className='flex items-center justify-between'
        >

            <h1
            
            className='font-[700] text-2xl text-black'
            >What's on your mind?</h1>

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
              className='hover:overflow-hidden'
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
                background: imageScroll === 185 || imageScroll >= 185 ?  '#E9E9EA'  :  '#D8D9DA'
              }}
              className='flex justify-center w-8 h-8 rounded-full'
              >

               <button              
               onClick={handleNext}
               >

                <IoIosArrowRoundForward 
                
                style={{
                 color: imageScroll === 185 || imageScroll >= 185 ?  '#909194'  :  '#23262B'
                }}
                className='size-[1.7rem] '
                />

              </button>

              </div>

            </div>

        </div>

        <div
        
        style={{ translate : `-${imageScroll}%`}}

        className='w-full cursor-pointer flex gap-6 mt-6 duration-1000'>

        {
        
        // eslint-disable-next-line react/prop-types
        dishNameData && dishNameData.map((item, i) => (
            
            <img
            className='w-36'
            key={i} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt={item.imageId} />
        ))}
        </div>

    </>

  )
}

export default DishName