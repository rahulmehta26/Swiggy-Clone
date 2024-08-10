import React from 'react'
import swiggy from '/swiggy.png'
import { IoIosArrowDown } from 'react-icons/io'
import { HiMiniBuildingOffice } from 'react-icons/hi2'
import { BiSolidOffer } from 'react-icons/bi'
import { MdAssignmentInd } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { IoHelpBuoyOutline } from 'react-icons/io5'

function Header() {

    const iconMapping = {
        HiMiniBuildingOffice: HiMiniBuildingOffice,
        FiSearch: FiSearch,
        BiSolidOffer: BiSolidOffer,
        IoHelpBuoyOutline: IoHelpBuoyOutline,
        MdAssignmentInd: MdAssignmentInd,
        FaShoppingCart: FaShoppingCart
    };


    const navItems = [
        {
            name:"Swiggy Corporate",
            image:"HiMiniBuildingOffice"
        },

        {
            name:"Search",
            image:"FiSearch"
        },

        {
            name:"Offers",
            image:"BiSolidOffer"
        },

        {
            name:"Help",
            image:"IoHelpBuoyOutline"
        },

        {
            name:"Sign In",
            image:"MdAssignmentInd"
        },

        {
            name:"Cart",
            image:"FaShoppingCart"
        },
    ]

  return (

    <>
    
    <div
    className='w-full flex justify-center shadow-md py-4'
    >

       <div 
       
       className='w-[80%] flex items-center justify-between'
       >

       <div 
        
        className='flex items-center gap-7'
        >
            
            <img 
            className='size-12 pr-3 cursor-pointer'
            src={swiggy}
            />
        
        <div 
        
        className='flex items-center gap-4 group'
        >

        <p 
            className='font-bold border-b-2 cursor-pointer text-[#424549] border-[#424549] group-hover:border-[#FC8019] group-hover:text-[#FC8019]'
            >other</p>

            <IoIosArrowDown
            
            className="size-4 cursor-pointer text-[#FC8019] group-hover:text-[#FC8019]"
            />

        </div>


        </div>

        <div
        
        className='flex items-center gap-12 '
        >

            {
                navItems.map((items, i) => {

                    const IconComponent = iconMapping[items.image];
                    const hoverStyle = items.name !== "Swiggy Corporate" ? { color: '#FC8019' } : {};

                    return(
                        <div
        
                        key={i}
                        className='flex items-center gap-2 cursor-pointer text-[#424549] font-semibold'
                        >
                
                        <IconComponent
                        
                        style = {hoverStyle}
                        className='size-5 '
                        />
                
                        <p 
                        
                        className='text-lg hover:text-[#FC8019]'
                        >{items.name}</p>
                
                        </div>
                    )
                })
            }

        </div>

       </div>

    </div>

    </>

)
}

export default Header