/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { IoIosStar } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RestaurantCard = ({ data:{info} }) => {

  const {
    id,
    name,
    avgRating,
    sla,
    cloudinaryImageId,
    costForTwoMessage,
    cuisines,
    promoted = "",
    aggregatedDiscountInfoV3 = "",
  } = info;

  const {resLocation} = useSelector((state) => state.toggleSlice.similarResDish )

  return (

    <Link to={`/foodInfo/${resLocation}-${id}`}>
   

    <div
      className=" p-3 cursor-pointer bg-white gap-x-4 border flex items-center"
      // onClick={}
    >
      <div className="relative mb-2 ">
        {promoted && (
          <div className="w-7 text-center absolute top-1 -left-1 py-[.1rem] px-[.2rem] bg-[#515057] rounded-md">
            <p className="text-[.7rem] font-medium text-[#E5E6E8]">Ad</p>
          </div>
        )}

        {cloudinaryImageId && (
          <img
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" +
              cloudinaryImageId
            }
            className="w-24 h-24 rounded-lg object-cover"
          />
        )}

        <div className=" w-20 absolute left-[8%] bottom-[1.25rem] shadow rounded-t-md bg-[#FF5200] text-center ">
          <p className="text-white font-semibold text-[.7rem]">
            {aggregatedDiscountInfoV3?.discountTag}
          </p>
        </div>

        {aggregatedDiscountInfoV3?.header &&
          aggregatedDiscountInfoV3?.subHeader && (
            <div className=" w-20 absolute left-[8%] -bottom-2 shadow rounded-md bg-[white] p-1 text-center ">
              <p className="text-[#FF5200] font-bold text-[.9rem]">
                {aggregatedDiscountInfoV3?.header}
              </p>

              {/* <p 
      className="text-[#FF7533] font-normal text=sm "
      >
        {aggregatedDiscountInfoV3?.subHeader}
      </p> */}

              <p></p>
            </div>
          )}
      </div>

      <div>
        <h3 className="text-[#3E4152] text-sm font-bold ">By {name && name}</h3>

        <div className="flex items-center mt-1 gap-x-2">
          <IoIosStar className="size-4 text-[#7E808C]" />

          <p className="text-[#7E808C] text-[.8rem] font-semibold ">
            {avgRating} <span>{sla?.slaString}</span>{" "}
            <span> {costForTwoMessage && costForTwoMessage}</span>{" "}
          </p>
        </div>

        <p className="text-[#7E808C] line-clamp-1 text-[.8rem] font-normal ">
          {cuisines?.join(", ")}
        </p>
      </div>
    </div>

    </Link>
  );
};

export default RestaurantCard;
