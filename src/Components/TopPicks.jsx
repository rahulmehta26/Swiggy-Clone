/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React from "react";
import Heading from "./Heading";

function TopPicks({topPickData }) {

  return (
    <>

      <div className="my-8 w-full px-4">

        <Heading text={topPickData?.card?.card?.title} textStyle={"text-xl"} />

        <div className="flex mt-4 gap-3 overflow-hidden">
          {topPickData?.card?.card?.carousel?.map(
            ({
              creativeId,
              bannerId,
              dish: {
                info: { price },
              },
            }, index) => {
              return (
                <>
                  <div key={index} className="relative">
                    <div className="w-[19rem] h-[20rem]">
                      <img
                        src={
                          "https://media-assets.swiggy.com/swiggy/image/upload/" +
                          creativeId
                        }
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    </div>

                    <div className="flex justify-between items-center absolute left-0 right-0 bottom-0 px-4 pb-2 ">
                      {price && <p className="text-white">₹{price / 100}</p>}

                      <button className="w-[7.5rem] p-1 bg-white border rounded-lg shadow-md text-[#1BA672] text-lg font-bold ">
                        Add
                      </button>
                    </div>
                  </div>
                </>
              );
            }
          )}
        </div>
      </div>

    </>
  );
}

export default TopPicks;
