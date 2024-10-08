/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import DishItemCard from "./DishItemCard";
import Heading from "./Heading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RestaurantName({ restaurantData, topAddress }) {
  const [slider, setSlider] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2.5,
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
        text={topAddress}
        onPrev={handlePrev}
        onNext={handleNext}
        currentSlide={currentSlide}
        totalItems={restaurantData.length}
        slidesToShow={settings.slidesToShow}
      />

      <div className="w-full mt-4 gap-x-8">

        <Slider ref={(slider) => setSlider(slider)} {...settings}>

          {restaurantData &&
            restaurantData.map(({ info, cta: { link } }, i) => {
              return (
                <div
                  key={i}
                  className="w-72 hover:scale-95 duration-200 cursor-pointer"
                >
                  <DishItemCard {...info} link={link} />
                </div>
              );
            })}
        </Slider>
      </div>
    </>
  );
}

export default RestaurantName;
