/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Heading from "./Heading";
import AddBtn from "./AddBtn";
import { isSameResToggleReducer } from "../Redux/toggleSlice";
import { clearCartItem } from "../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function TopPicks({topPickData, resData }) {

  const [slider, setSlider] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isResSame = useSelector((state) => state.toggleSlice.isSameResToggle )

  const dispatch = useDispatch()

  const handleResSameData = () => {

    dispatch(isSameResToggleReducer())

}
  
  const handleClearCart = () => {
  
    dispatch(clearCartItem())
  
    handleResSameData()
  
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const handlePrev = () => {
    if (slider) {
      slider.slickPrev();
    }
  };

  const handleNext = () => {
    if (slider) {
      slider.slickNext();
    }
  };

  return (
    <>

      <div className="my-8 w-full px-4">

        <Heading 
        text={topPickData?.card?.card?.title} 
        textStyle={"text-xl"}
        onPrev={handlePrev}
        onNext={handleNext}
        currentSlide={currentSlide}
        totalItems={topPickData.length}
        slidesToShow={settings.slidesToShow} 
        />

        <div className=" mt-4 gap-3">

        <Slider ref={(slider) => setSlider(slider)} {...settings}>

          {topPickData?.card?.card?.carousel?.map(
            ({
              creativeId,
              bannerId,
              dish
            }, index) => {

              let {info} = dish
 
              return (
                <>
                  <div key={index} className="relative">

                    <div className="w-[19rem] relative h-[20rem]">
                      <img
                        src={
                          "https://media-assets.swiggy.com/swiggy/image/upload/" +
                          creativeId
                        }
                        className="w-full h-full rounded-2xl object-cover"
                      />

                    <div className="flex justify-between items-center absolute left-0 right-0 bottom-0 px-4 pb-2 ">
                      {info?.price && <p className="text-white">₹{info?.price / 100}</p>}

                       <AddBtn resData={ resData } data = {dish?.info } handleResSameData = {handleResSameData} />

                    </div>

                    </div>

                  </div>
                </>
              );
            }
          )}

        </Slider>

        </div>

      </div>

      {   isResSame && 
     
     <div 
     className='w-[33rem] p-7 space-y-8 bg-white z-50 fixed left-[33%] bottom-10'
     style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)' }}
     >

       <div>

         <h1
          className='text-[#282C3F] text-lg font-bold'
         >Items already in cart</h1>

         <p className='text-[.8rem] text-[#93959F]'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
       </div>

       <div className='w-full gap-x-5 flex justify-between'>

         <button 
         className='w-1/2 border-2 border-[#60B246] p-[.7rem] text-[#60B246] font-bold'
         onClick={handleResSameData}
         >No</button>

         <button
         className='w-1/2 p-[.7rem] bg-[#60B246] text-white font-bold'
         onClick={handleClearCart}
         >YES, START AFRESH</button>

       </div>

     </div>
     
     }

    </>
  );
}

export default TopPicks;
