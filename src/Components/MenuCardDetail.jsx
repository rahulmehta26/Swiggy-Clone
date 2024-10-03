/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { nonVeg, veg } from '../image';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartItem } from '../Redux/cartSlice'; 
import AddBtn from './AddBtn';
import { isSameResToggleReducer } from '../Redux/toggleSlice';


function MenuCardDetail({data, isLast, resData , id}) {

    const [toggleMore, setToggleMore] = useState({})

    const isResSame = useSelector((state) => state.toggleSlice.isSameResToggle )

    //  (resData)

    const {
        defaultPrice,
        description,
        imageId,
        itemAttribute:{vegClassifier},
        name,
        price,
        ratings:{aggregatedRating:{rating, ratingCountV2}},

    } = data;

    const desItem = description?.substring(0, 145);

    const handleToggle = (id) => {
        setToggleMore((prevStates) => ({
          ...prevStates,
          [id]: !prevStates[id],
        }));
      };

    const isToggled = toggleMore[id];
    
    const dispatch = useDispatch();

    const handleResSameData = () => {

      dispatch(isSameResToggleReducer())
    }

    const handleClearCart = () => {

      dispatch(clearCartItem())

      handleResSameData()
  
      // localStorage.clear()
    }

  return (

    <>

    <div 
    className='w-full relative' 
    >

      <div key={id} className='w-full flex justify-between mt-6 mb-12 items-center'>

        <div className='w-[70%]' >

            <img
             src={`${
             vegClassifier?.toLowerCase() === "veg" ? veg : nonVeg}`}
             className="w-4 h-4 rounded-sm"
              />

            <h1 className="text-[#414449] text-[1.1rem] font-bold ">{name}</h1>

            {
           
               price &&  <p className="text-[#161A1F] text-[.9rem] font-semibold " >₹ {price / 100 || defaultPrice /100 }</p>

            }

            {rating && 
                  (
                    <div className="flex items-center mt-2 gap-1 ">
                      <FaStar className="size-4 text-[#116649] " />

                      <p className="text-[#116649] text-[.9rem] font-semibold">
                        {rating}
                        <span className="text-[#676A6D] ml-[.1rem] ">
                          {" "}
                          ({ratingCountV2}){" "}
                        </span>{" "}
                      </p>
                    </div>
                  )
            }

            <div className='mt-2'>

                     <span className="text-[#676A6D] w-[70%] mt-4 text-[.9rem] font-semibold">
                         {" "}
                         {isToggled ? description :  desItem}{" "}
                     </span>
         
                     {
                     description?.length > 145 ? (

                         <button onClick={() => handleToggle(id)}>

                             <span className="text-[#676A6D] mt-3 text-[.9rem] font-bold">

                               {isToggled ? "...less" : "...more"}
                        
                             </span>
                         </button>
                           ) : ("")
                     }

            </div>

        </div>

        <div className='w-[20%] relative'>
            {imageId && (
                    <img
                      src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/" +
                        imageId
                      }
                      className="w-40 h-32 rounded-xl object-cover"
                      alt="food-item"
                    />
                  )}

                  <div className={`${
                      imageId && "absolute ml-0 top-[83%] left-[9.5%]"
                    }`}>

                     <AddBtn 
                        handleResSameData = {handleResSameData} 
                        data = {data} 
                        resData = {resData}
                        customStyle='w-[7.5rem]'
                        />
                  </div >

            
        </div>

      </div>

      {
           !isLast &&   <hr className="border" />

      }

     {   isResSame && 
     
      <div 
      className='w-[33rem] p-7 space-y-8 shadow-2xl bg-white z-10 fixed left-[33%] bottom-10'
      style={{ boxShadow: '0 0 25px rgba(0, 0, 0, 0.3)' }}
      >

        <div>

          <h1
           className='text-[#282C3F] text-lg font-bold'
          >Items already in cart</h1>

          <p className='text-[.8rem] text-[#93959F]'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
        </div>

        <div className='w-full gap-x-5 flex justify-between'>

          <button 
          className='w-1/2 border-2 border-[#60B246] p-[.7rem] text-[#60B246] font-bold'
          onClick={handleResSameData}
          >No</button>

          <button
          className='w-1/2 p-[.7rem] bg-[#60B246] text-white font-bold'
          onClick={handleClearCart}
          >YES, START AFRESH</button>

        </div>

      </div>
      
      }

     </div>
      
    </>

  )
}

export default MenuCardDetail