/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Heading = ({text, textStyle, onPrev, onNext, currentSlide, totalItems, slidesToShow}) => {

  const isAtStart = currentSlide === 0;
  const isAtEnd = currentSlide >= totalItems - slidesToShow;

  return (

    <div>

      <div className="flex justify-between items-center">

        <h1 className={`font-bold text-2xl text-[#161A1F] ${textStyle} `}>

          {text || "Title"}
        </h1>

        <div className="flex gap-2">

          <div className= {`flex justify-center ${
            isAtStart ? 'bg-[#E9E9EA]' : 'bg-[#D9DADB]'
          } w-8 h-8 rounded-full`} >

            <button onClick={onPrev}>

              <IoIosArrowRoundBack className={`size-[1.7rem]  ${
            isAtStart ? 'text-[#909194]' : 'text-[#23262B]'
          } `} />

            </button>
          </div>

          <div className= {`flex justify-center ${
            isAtEnd ? 'bg-[#E9E9EA]' : 'bg-[#D9DADB]'
          } w-8 h-8 rounded-full`} >

            <button onClick={onNext}>

              <IoIosArrowRoundForward className={`size-[1.7rem]  ${
            isAtEnd ? 'text-[#909194]' : 'text-[#23262B]'
          } `} />

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
