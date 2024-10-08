/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { nonVeg, veg } from "../image";

const CartHoverCard = () => {

  const cartData = useSelector((state) => state.cartSlice.cartItems);

  const resData = useSelector((state) => state.cartSlice.resData )

  const totalAmount = cartData?.reduce((acc, item) => {
    return acc + item.price; 
  }, 0) || 0

  return (
    <div 
    className="relative w-[20rem] bg-white ml-10 cursor-pointer glow-box shadow-xl border-2 p-8 space-y-3 border-t-[#FF5200]"
    >

        {
            cartData?.length ? (

                <>

                <div 
                className="w-full space-y-2 gap-x-3 flex items-center"
                >
                    
                    <div
                    className="w-16 h-12"
                    >

                        <img
                        src = {"https://media-assets.swiggy.com/swiggy/image/upload/" + cartData[0]?.imageId  }
                        className="w-full h-full object-cover"
                        />
                    </div>

                    <div>

                    <h1
                    className=" text-[1rem] text-[#282C3F] font-semibold "
                    >{resData?.name}</h1>

                    <p
                    className=" text-[.8rem] text-[#7E808C] font-medium "
                    >{resData?.city}</p>

                    </div>

                </div>

                <hr className="w-full border  border-dashed border-[#b2b3b9]" />

                <div className="my-4">

                {
                    cartData?.map((data, index) =>{

                        return(
                            <div 
                            key={index}
                            className="flex justify-between items-center"
                            >

                                <div
                                className="flex items-center gap-x-1"
                                >

                                    <img 
                                    src={ data?.itemAttribute?.vegClassifier === "NONVEG" ? nonVeg : veg  }
                                    className="w-3 h-3"
                                    /> 

                                    <p
                                    className=" text-[.8rem] line-clamp-1 text-[#3D4152] "
                                    >{data?.name}</p>
                                </div>

                                <p
                                className=" text-[.8rem] line-clamp-1 font-normal text-[#3D4152] "
                                > ₹
                                    {
                                       data?.price ? data?.price / 100 : "00" 
                                    }
                                </p>

                            </div>
                        )
                    } )
                }

                </div>


                <hr className="w-full border  border-dashed border-[#b2b3b9]" />

                <div>

                <div
                className="flex justify-between items-center"
                >

                    <h1
                    className="text-[.85rem] font-bold text-[#282C3F] "
                    >Sub total</h1>

                    <p
                    className="text-[.85rem] font-bold text-[#282C3F] "
                    >₹ {totalAmount /100 }</p>
                </div>

                <p
                className=" text-[.75rem] text-[#7E808C] "
                >Extra charges may apply</p>
                
                </div>

                
        <Link to={"/cart"}>
              <button className="w-[100%] text-white font-bold mt-6 text-[1rem] bg-[#FF5200] hover:shadow-md p-2">
                CHECKOUT
              </button>
            </Link>
                </>

            ) : (
                <>

                <h1
                className=" text-[1.8rem] text-[#7E808C] font-bold "
                >Cart Empty</h1>
        
                <p
                className=" text-[.85rem] w-[80%] text-[#93959F] font-medium "
                >Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
                </>
            )
        }

    </div>
  );
};

export default CartHoverCard;
