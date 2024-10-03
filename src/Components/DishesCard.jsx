/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { IoIosStar } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import AddBtn from "./AddBtn";
import { nonVeg, veg } from "../image";
import {
  isSameResToggleReducer,
  setSimilarResDish,
} from "../Redux/toggleSlice";
import { clearCartItem } from "../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const DishesCard = ({
  data: {
    info,
    restaurant: { info: resInfo },
    hideRestaurantDetails = false,
  },
}) => {
  let { id: itemId, imageId = "",discription ="" , name, price, isVeg = "" } = info;

  let {
    id,
    name: resName,
    avgRating,
    sla: { slaString },
    slugs: { city, restaurant: resLocation },
  } = resInfo;

  const isResSame = useSelector((state) => state.toggleSlice.isSameResToggle);

  const [showDetail, setShowDetail] = useState(false);

  const [showData, setShowData] = useState([]);

  const dispatch = useDispatch();

  const handleResSameData = () => {
    dispatch(isSameResToggleReducer());
  };

  const { id: resIdData } = useSelector((state) => state.cartSlice.resData);

  const handleSameRes = (id) => {
    if (resIdData === id) {
      dispatch(
        setSimilarResDish({
          sameResDishToggle: true,
          city: city,
          resId: id,
          itemId: itemId,
          resLocation: resLocation,
        })
      );
    }
  };

  const handleClearCart = () => {
    dispatch(clearCartItem());

    handleResSameData();
  };

  const handleMoreDetail = (value) => {
    setShowData(value);

    setShowDetail(true);
  };

  return (
    <>
      <div key={id} className="bg-white rounded-3xl px-4 pt-6 pb-1 ">
        {!hideRestaurantDetails && (
          <>
            <Link to={`/foodInfo/${resLocation}-${id}`}>
              <div
                className="flex justify-between items-center cursor-pointer"
                // onClick={}
              >
                <div>
                  <h3 className="text-[#686B78] text-sm font-bold ">
                    By {resName && resName}
                  </h3>

                  {avgRating && (
                    <div className="flex items-center mt-1 gap-x-2">
                      <IoIosStar className="size-4 text-[#7E808C]" />

                      <p className="text-[#7E808C] text-[.8rem] font-normal ">
                        {avgRating} <span>{slaString}</span>{" "}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <HiArrowRight className="size-6 text-[#7E808C]" />
                </div>
              </div>
            </Link>

            <hr className="border-dashed my-4 border-[#d1d2d4]" />
          </>
        )}

        <div
          className={`flex justify-between ${
            imageId ? "mb-8" : "mb-3"
          } items-center`}
        >
          <div>
            <img src={isVeg ? veg : nonVeg} className="size-[1rem]" />

            <h1 className="text-[#414449] font-semibold text-[1.05rem] ">
              {name && name}
            </h1>

            <p className="text-[#161A1F] font-semibold text-[1.05rem] ">
              ₹ {price && price / 100}
            </p>

            {!discription && (
              <button
                className=" w-[7.2rem] mt-4 justify-between border border-[#D9DADB] rounded-2xl px-2 py-[.3rem] flex text-[#676A6D] text-[.85rem] font-medium items-center"
                onClick={() => handleMoreDetail(info)}
              >
                More Details
                <RiArrowRightSLine className="size-4 text-[#676A6D] " />
              </button>
            )}
          </div>

          <div className=" relative">
            {imageId && (
              <div className="w-32 h-32">
                <img
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/" +
                    imageId
                  }
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
            )}

            <div
              className={`${imageId ? "absolute top-[85%] left-[12.5%]" : ""}`}
              onClick={() => handleSameRes(id)}
            >
              <AddBtn
                handleResSameData={handleResSameData}
                data={info}
                resData={resInfo}
              />
            </div>
          </div>
        </div>
      </div>

      {isResSame && (
        <div
          className="w-[33rem] p-7 space-y-8 bg-white z-50 fixed left-[33%] bottom-10"
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}
        >
          <div>
            <h1 className="text-[#282C3F] text-lg font-bold">
              Items already in cart
            </h1>

            <p className="text-[.8rem] text-[#93959F]">
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </p>
          </div>

          <div className="w-full gap-x-5 flex justify-between">
            <button
              className="w-1/2 border-2 border-[#60B246] p-[.7rem] text-[#60B246] font-bold"
              onClick={handleResSameData}
            >
              No
            </button>

            <button
              className="w-1/2 p-[.7rem] bg-[#60B246] text-white font-bold"
              onClick={handleClearCart}
            >
              YES, START AFRESH
            </button>
          </div>
        </div>
      )}

      {showDetail && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 "
            onClick={(prev) => setShowDetail(!prev)}
          ></div>

          <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl  w-[32%]">

            <div className="relative">
              <img
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/" +
                  showData?.imageId
                }
                className="w-full h-[28rem] object-cover rounded-t-3xl "
              />

              <div
                className="w-[1.75rem] h-[1.75rem] p-1.5 rounded-full cursor-pointer bg-white absolute top-4 right-5"
                onClick={(prev) => setShowDetail(!prev)}
              >
                <RxCross2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-end">
                <div>
                  <img src={isVeg ? veg : nonVeg} className="size-[1rem]" />

                  <h1 className="text-[#414449] font-semibold text-[1.05rem] ">
                    {showData?.name}
                  </h1>

                  <p className="text-[#161A1F] font-semibold text-[1.05rem] ">
                    ₹ {showData?.price / 100}
                  </p>
                </div>

                <div>
                  <AddBtn
                    handleResSameData={handleResSameData}
                    data={info}
                    resData={resInfo}
                    customStyle="w-[8rem] p-2 "
                  />
                </div>
              </div>

              <p className="text-[#676A6D] text-[.9rem] font-medium mt-4 ">
                {showData?.description}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DishesCard;
