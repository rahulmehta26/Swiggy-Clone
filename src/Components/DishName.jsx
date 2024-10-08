/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Heading from './Heading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// eslint-disable-next-line react/prop-types
function DishName({ dishNameData }) {
  const [slider, setSlider] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
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
      <Heading 
      text="What's on your mind?" 
      onPrev={handlePrev} 
      onNext={handleNext} 
      currentSlide={currentSlide}
      totalItems={dishNameData.length}
      slidesToShow={settings.slidesToShow}
      />


      <div className="w-full mt-6">

        <Slider ref={(slider) => setSlider(slider)} {...settings}>

          {
          dishNameData?.map((item, i) => (

            <div key={i} className="w-24 p-2">
              <img
                className="w-full h-auto rounded-lg "
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item?.imageId}`}
                alt={item?.imageId || `dish-${i}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default DishName;
