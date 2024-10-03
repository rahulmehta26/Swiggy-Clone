/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import DishItemCard from "./DishItemCard";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setFilterData } from "../Redux/filterSlice";

function OnlineRestaurant({onlineResData, onlineAddress}) {
    
  const filterDataName = [

    {
      filterName : "Ratings 4.0+"
    },

    {
      filterName : "Offers"
    },  
    
    {
      filterName : "Rs. 300 - 400"
    }, 
    
    {
      filterName : "Less than 300"
    },   
    
    {
      filterName : "New on swiggy"
    },   
    
    {
      filterName : "Pure veg"
    },  
    
    {
      filterName : "Fast Delivery"
    },

  ]

  const [isActive, setIsActive] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFilterData(isActive)); 
  }, [isActive, dispatch]);

  const handleFilterActive = (filterName) => {

       const info = isActive === filterName ? null : filterName
 
        setIsActive(info)
        
      }
 
  return (

      <>

      <div>

        <h1    
        className='font-[700] text-2xl text-black'
        >{onlineAddress}</h1>

        <div 
        className="my-6 gap-x-2 flex">

           { 
         
              filterDataName?.map((data, index) => {

                 return (

                    <div key={index}>

                      <button 
                      className= {` fliterBtn flex text-[#414449] text-[.85rem] font-medium items-center gap-x-2 ${isActive === data.filterName ? "bg-[#F0F0F5]" : "" } ` }
                      onClick={() => handleFilterActive(data.filterName)}
                      >

                        <p>{data?.filterName}</p>

                        <RxCross2 className= {` w-4 h-4 ${isActive === data.filterName ? "" : "hidden" } `} />
                        
                      </button>

                    </div> 
                   )
                })
           } 

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
      </div>
      

      </>

  ); 
}

export default OnlineRestaurant;
