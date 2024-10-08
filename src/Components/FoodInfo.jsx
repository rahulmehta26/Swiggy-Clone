/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { MdStars } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import DiscountCard from "./DiscountCard";
import { IoSearchOutline } from "react-icons/io5";
import TopPicks from "./TopPicks";
import MenuCard from "./MenuCard";
import { useSelector } from "react-redux";
import { FoodInfoLoader } from "./SkeletonLoader";
import SmallFooter from "./SmallFooter";
import Heading from "./Heading";
import Slider from "react-slick/lib/slider";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function FoodInfo() {
  const { id } = useParams();

  let mainId = id.split("-").at(-1).replace(/\D/g, "");

  const [menuData, setMenuData] = useState([]);
  const [topPickData, setTopPickData] = useState([]);
  const [resData, setResData] = useState([]);
  const [offerData, setOfferData] = useState([]);
  const [slider, setSlider] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const {lat, lng} = useSelector((state) => state.geoCodeSlice )

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

  const fetchData = async () => {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URLs}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&submitAction=ENTER`
    );

    let res = await data.json();

    setOfferData(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

    const TopPick =
      res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (data) => data?.card?.card?.title === "Top Picks"
      )[0];

    setTopPickData(TopPick);

    setResData(res?.data?.cards[2]?.card?.card?.info);

    const Menudata =
      res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );

    setMenuData(Menudata);

  };

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  return (
    <>

    {
      menuData?.length ? (
        <div className="w-full">

        <div className="w-[52rem] h-screen flex flex-col relative justify-between mx-auto pt-8 px-8 ">

          <div className="w-full">

          <p className="text-[0.625rem] font-medium text-slate-400">
            <Link to={"/"}>
              <span>Home</span>
            </Link>{" "}
            / {" "}
            <Link>
              <span>{resData?.city} </span>
            </Link>
            / <span>{resData?.name}</span>
          </p>

          <h1 className="text-2xl font-bold text-[#161A1F] mt-10 pl-4">
            {resData?.name}
          </h1>

          <div className="w-full bg-gradient-to-t from-[#E2E2EA] rounded-[2rem] mt-2 p-4">
            <div className="w-full border bg-white rounded-2xl">
              <div className="p-4">
                <p className="flex gap-2 font-bold text-[1.1rem] text-[#161A1F] items-center">
                  {" "}
                  <MdStars className="text-[#188C3E] size-5" />{" "}
                  <span>{resData?.avgRating}</span> (
                  {resData?.totalRatingsString}){" "}
                  <span>{resData?.costForTwoMessage}</span>
                </p>

                <p className="underline font-bold text-sm text-[#FF5200]">
                  {resData?.cuisines?.join(", ")}
                </p>

                <p className="flex items-center gap-2 text-[.9rem] font-bold text-[#161A1F] mt-2 ">
                  Outlet{" "}
                  <span className="ml-2 text-[#676A6D] font-medium ">
                    {resData?.areaName}
                  </span>{" "}
                  <BiSolidDownArrow className="size-2 text-[#FF5200]" />
                </p>

                <p className=" text-[.9rem] font-bold text-[#161A1F] mt-2 ">
                  {resData?.sla?.slaString?.toLowerCase() || ""}
                </p>
              </div>

              <hr className=" mb-1" />

              <p className="flex items-center text-[#676A6D] text-[.9rem] font-medium gap-2 pb-4 py-2 px-4 ">
                {" "}
                <img
                  src={
                    "https://media-assets.swiggy.com/swiggy/image/upload/" +
                    resData?.feeDetails?.icon
                  }
                  className="size-6"
                />{" "}
                {resData?.feeDetails?.message?.replace(/<[^>]*>/g, "") || ""}
              </p>
            </div>
          </div>

          <div className="w-full pl-4 pr-5 mt-6">

          <Heading 
        text="Deals for you" 
        textStyle={"text-xl"}
        onPrev={handlePrev}
        onNext={handleNext}
        currentSlide={currentSlide}
        totalItems={topPickData.length}
        slidesToShow={settings.slidesToShow} 
        />

            <div className=" overflow-hidden ">

        <Slider ref={(slider) => setSlider(slider)} {...settings}>

              {offerData &&
                offerData?.map((items, i) => 
                  {
                    return(

                      < >
                      <div className="" key={i}>
                      <DiscountCard  data={items} />
                      </div>
                      </>
                      
                  
                    )
                  }
                )}

</Slider>
            </div>
          </div>

          <div className="mt-10 px-4">
            <h1 className="text-[#676A6D] text-center text-sm tracking-[.2rem] font-semibold ">
              MENU
            </h1>

            <Link to={'/Search'} >
            <div className="w-full flex justify-center items-center cursor-pointer bg-[#F2F2F3] relative rounded-xl mt-4 p-3 ">
              <p className="text-[#626568] font-semibold text-center text-md ">
                Search for dishes
              </p>


              <IoSearchOutline className="size-5 text-[#626568] mr-4 absolute right-0" />
            </div>
            </Link>
          </div>

          {topPickData && <TopPicks resData = {resData} topPickData =  {topPickData} />  }

          <div className="mt-8" >

            {menuData?.map(({ card: { card } }, index) => {

              return <MenuCard key={card.id} resData = {resData} card={card} />;
            })}
          </div>

          </div>

          <div className="w-full">

              <SmallFooter resData = {resData} />
          </div>

        </div>

      </div>
      ) : <FoodInfoLoader/>
    }

    </>
  );
}

export default FoodInfo;
