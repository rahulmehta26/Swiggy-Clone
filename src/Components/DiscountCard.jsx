/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function DiscountCard({data : {info}}) {

  return (

    <>

      <div className="min-w-[20rem] flex items-center gap-2 border-2 rounded-2xl mt-4 p-3">

        <img
          src={"https://media-assets.swiggy.com/swiggy/image/upload/"+ info?.offerLogo}
          className="size-12"
        />

        <div>

            <p className="text-[#161A1F] line-clamp-1 text-[1.05rem] font-[900] "> {info?.header} </p>

            <p className="text-[#8D8F91] text-sm font-bold "> {info?.couponCode} </p>
        </div>

      </div>

    </>
  );
}

export default DiscountCard;
