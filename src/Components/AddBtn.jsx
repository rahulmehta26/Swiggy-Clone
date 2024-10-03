/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

const AddBtn = ({customStyle ='', data, resData, handleResSameData }) => {

  const cartData = useSelector((state) => state.cartSlice.cartItems )

  const resDataInfo = useSelector((state) => state.cartSlice.resData )  
  
  const dispatch = useDispatch();

  const handleAddToCart = () => {

    const isPresent = cartData.find((val) => val.id === data.id )


    if (!isPresent) {

      if(resDataInfo.name === resData.name && resDataInfo.areaName === resData.areaName || resDataInfo.length === 0 ){

            dispatch(addToCart({data, resData}))

            toast.success("Food added to the cart")

      } else{

        handleResSameData()

      }

    } else {

      // alert("Already item added")

      toast.error("Already item added")
      
    }

  }

  return (

    <button 
    className= {`w-24 p-1 border shadow bg-white rounded-lg text-[#1BA672] font-bold text-lg ${customStyle} `}
    onClick={handleAddToCart}
    >
      Add
    </button>

  );
};

export default AddBtn;
