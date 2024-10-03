/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const HelpCard = ({id, title, desc, description}) => {

     (title)

    const [isToggle, setIsToggle] = useState(false)

    useEffect(() => {
      setIsToggle(false);
    }, []);

    const handleToggle = (id) => {

        setIsToggle((prev) => !prev);
    
      }

  return (

    <div
    className="mt-6"
    >

     <div 
     className="flex justify-between cursor-pointer items-center"
     onClick={() => handleToggle(id) }
     >

     <h3
     className="text-[#3D4152] text-[1.1rem]  hover:text-[#FF5200] "
     >{title}</h3>

     {
       isToggle ? < IoIosArrowUp className="w-6 text-[#C4C5CA] h-6" /> : < IoIosArrowDown className="w-6 text-[#C4C5CA] h-6" />
     }

     </div>

     {
       isToggle ? (
         <div
         className="mt-6 w-[92%] "
         >

           <p
           className="text-[.8rem] text-[#686B78] "
           >{desc || description }</p>
         </div>
       ) : ""
     }

     <hr className="border-[#D4D5D9] mt-6" />

   </div>
    
  )
}

export default HelpCard