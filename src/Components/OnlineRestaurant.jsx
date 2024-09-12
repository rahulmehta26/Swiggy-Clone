/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";
import DishItemCard from "./DishItemCard";

function OnlineRestaurant({onlineResData, onlineAddress}) {
    
  // console.log(onlineResData)

  return (

      <>
      
        <div>

            <h1
            
            className='font-[700] text-2xl text-black'
            >{onlineAddress}</h1>

        </div>

        <div
      
        className='w-full mt-4 grid grid-cols-4 gap-10'
        >

          {
          // eslint-disable-next-line react/prop-types
          onlineResData && onlineResData.map(({info, cta : {link}}, i) => {

              return(

                <div
                
                key={i}
                className="hover:scale-95 duration-200 cursor-pointer"
                >

                  <DishItemCard {...info} link = {link}/>

                </div>

              )
            })
          }

        </div>

      </>

  ); 
}

export default OnlineRestaurant;
