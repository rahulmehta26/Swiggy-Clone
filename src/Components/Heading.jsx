/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Heading = ({text, textStyle}) => {

  const handlePrev = () => {};

  const handleNext = () => {};

  return (

    <div>

      <div className="flex justify-between items-center">

        <h1 className={`font-bold text-2xl text-[#161A1F] ${textStyle} `}>

          {text || "Title"}
        </h1>

        <div className="flex gap-2">

          <div className="flex justify-center bg-[#D9DADB] w-8 h-8 rounded-full">
            <button onClick={handlePrev}>
              <IoIosArrowRoundBack className="size-[1.7rem] " />
            </button>
          </div>

          <div className="flex justify-center bg-[#D9DADB] w-8 h-8 rounded-full">
            <button onClick={handleNext}>
              <IoIosArrowRoundForward className="size-[1.7rem] " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
