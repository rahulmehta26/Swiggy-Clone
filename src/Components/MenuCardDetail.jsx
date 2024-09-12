/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { nonVeg, veg } from '../image';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';


function MenuCardDetail({data, isLast, resData , id}) {

    const [toggleMore, setToggleMore] = useState({})

    // console.log(resData)

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

    const cartData = useSelector((state) => state.cartSlice.cartItems )

    const resDataInfo = useSelector((state) => state.cartSlice.resData )  
    
    const disPatch = useDispatch()

    const handleAddToCart = () => {

      const isPresent = cartData.find((val) => val.id === data.id )

      // const resDataInfo = JSON.parse(localStorage.getItem("resData")) || []

      if (!isPresent) {

        if(resDataInfo.name === resData.name && resDataInfo.areaName === resData.areaName || resDataInfo.length === 0 ){

            disPatch(addToCart({data, resData}))

        } else{
          alert("Different restaurant item")
        }

      } else {

        alert("Already item added")
        
      }

    }

  return (

    <>
    
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

                  <button
                    className={` w-[7.5rem] ml-4 p-1 ${
                      imageId && "absolute ml-0 top-[83%] left-[0%]"
                    } bg-white border rounded-lg shadow-md text-[#1BA672] text-lg font-bold `}
                    onClick={handleAddToCart}
                  >
                    ADD
                  </button>
            
        </div>

      </div>

      {
           !isLast &&   <hr className="border" />

      }
      

    </>

  )
}

export default MenuCardDetail