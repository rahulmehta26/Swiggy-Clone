import React, { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";
import DishItemCard from "./DishItemCard";

function OnlineRestaurant({onlineResData}) {
    
  // console.log(onlineResData)

  return (

      <>
      
        <div>

            <h1
            
            className='font-[700] text-2xl text-black'
            >Restaurants with online food delivery in</h1>

        </div>

        <div
      
        className='w-full mt-4 grid grid-cols-4 gap-8'
        >

          {
          // eslint-disable-next-line react/prop-types
          onlineResData && onlineResData.map(({info}, i) => {

              return(

                <div
                
                key={i}
                className="hover:scale-95 overflow-visible duration-200 cursor-pointer"
                >

                  <DishItemCard items={info}/>

                </div>

              )
            })
          }



        </div>

      </>

  ); 
}

export default OnlineRestaurant;
