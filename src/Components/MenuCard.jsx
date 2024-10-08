/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MenuCardDetail from "./MenuCardDetail";

function MenuCard({ card, catTitle, lastLine, resData, titleStyle }) {

  const [toggleItem, setToggleItem] = useState({})

  const handleToggle = () => {
    
    setToggleItem((prev) => !prev)
    
    }

    if(card?.itemCards ) {

        const {title, itemCards} = card 


       return (
     
         <>
     
            {
                !catTitle &&  <hr className="border-8 my-4 border-[#F2F2F3]" />
            }  
     
           <div 
           className="mx-[1rem]"
           >

             <div className="flex justify-between items-center">

     
               <h1 className={`font-bold text-[#161A1F] ${titleStyle} text-[1.2rem]`}>{title} ({itemCards?.length}) </h1>
     
                   {toggleItem ? (
     
                      <IoIosArrowDown
     
                        onClick={handleToggle}
     
                        className="size-5 cursor-pointer"
     
                       />
                     ) : (
     
                       <IoIosArrowUp
     
                         onClick={handleToggle}
     
                         className="size-5 cursor-pointer"
     
                    />
                  )}
     
             </div>

                {
                   catTitle && !lastLine && ( <hr className={`border ${toggleItem ? "w-32" : ""} `} /> )
                }
     
                {  
                
                   toggleItem && itemCards?.map((data, index) => <MenuCardDetail key={index} resData = {resData} isLast = { index === itemCards.length - 1} id = {index} data = {data?.card?.info} /> )
     
                }
         
     
           </div>
     
         </>
       );

    } else {

        const {title, categories} = card

        //  (title)

        return(

            <>

              <div>

              <hr className="border-8 my-4 border-[#F2F2F3]" />

              <p className="font-bold text-[#161A1F] text-[1.2rem] mx-[1rem] mt-4">
                 {card.title}{" "}
              </p>

                {
                   categories?.map((data, index) => {

                    const lastLine = index === categories.length - 1;

                    return (

                      <MenuCard key={index} resData = {resData} titleStyle ={"text-[1rem] my-5"} lastLine = {lastLine} catTitle = {title} card={data} />

                    )
                   
                    } )
                }        
              </div>

            
            </>
        )
    }

}

export default MenuCard;
