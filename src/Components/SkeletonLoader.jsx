/* eslint-disable no-unused-vars */
import React from "react";

const SkeletonLoader = () => {

  return (
    <div className="w-full">
      <div className="w-full flex gap-14 flex-col justify-center items-center  bg-slate-900 h-[19rem]">
        <div className="relative">
          <div className="w-[3rem] h-[3rem]">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
              className="w-full h-full object-cover"
            />
          </div>

          <div className=" loader absolute -top-4 -left-4 "></div>
        </div>

        <h1 className="text-3xl font-medium text-white">
          Looking for great food near you...
        </h1>
      </div>

      <div className="w-[85%] mx-auto p-6 flex flex-wrap gap-4 ">
        {Array(12)
          .fill("")
          .map((data, index) => (
            <div
              key={index}
              className="w-72 h-44 bg-slate-400/50 animate-pulse rounded-3xl "
            ></div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;

export function FoodInfoLoader() {
  return (
    <div className="w-full ">
      <div className="w-[52rem] space-y-4 mx-auto ">

        <p className="w-full animate-pulse p-2 bg-gray-200  "></p>

        <div className="w-[98%] space-y-4 mx-auto ">
          <p className="w-[8rem] bg-gray-200 p-1 animate-pulse  "></p>

        <p className="w-full animate-pulse p-20 bg-gray-200  "></p>

          <div className="w-[98%] space-x-6 grid grid-cols-2">
            {Array(2)
              .fill("")
              .map((data, index) => (
                <div key={index} className="space-y-3">
                  <div className="w-full h-[14rem] rounded-3xl bg-gray-200 animate-pulse "></div>

                  <p className="w-[6rem] bg-gray-200 p-1 animate-pulse  "></p>

                  <p className="w-[4rem] bg-gray-200 p-1 animate-pulse  "></p>

                  <div className="flex justify-between items-center">
                    <p className="w-[2.5rem] bg-gray-200 p-1 animate-pulse  "></p>
                    <p className="w-[5rem] bg-gray-200 p-1 py-3 animate-pulse  "></p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <p className="w-full animate-pulse p-6 bg-gray-200  "></p>

      </div>
    </div>
  );
}
