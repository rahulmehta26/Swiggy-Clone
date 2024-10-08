/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import DishName from "./DishName";
import RestaurantName from "./RestaurantName";
import OnlineRestaurant from "./OnlineRestaurant";
import { useDispatch, useSelector } from "react-redux";
import SkeletonLoader from "./SkeletonLoader";
import { setOfferData } from "../Redux/offerSlice";
import Footer from "./Footer";
import HoverCard from "./HoverCard";

function HeroSection() {
  
  const [restaurantData, setRestaurantData] = useState([]);

  const [dishNameData, setDishNameData] = useState([]);

  const [onlineResData, setOnlineResData] = useState([]);

  const [topAddress, setTopAddress] = useState([]);

  const [onlineAddress, setOnlineAddress] = useState([]);

  const [serviceData, setServiceData] = useState([]);

  const { lat, lng } = useSelector((state) => state.geoCodeSlice);

  const dispatch = useDispatch()

  const fetchData = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );

    const response = await data.json();

    const resdata_result =
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    const dish_result =
      response?.data?.cards[0]?.card?.card?.imageGridCards?.info;

    const onlineResData_result =
      response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setRestaurantData(resdata_result);

    setDishNameData(dish_result);

    setOnlineResData(onlineResData_result);

    setServiceData(response?.data);

    setTopAddress(response?.data?.cards[1]?.card?.card?.header?.title);

    setOnlineAddress(response?.data?.cards[2]?.card?.card?.title);
  };

  dispatch(setOfferData(onlineResData))

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  const filterValue = useSelector((state) => state.filterSlice.filterValue);

  const filteredData = restaurantData?.filter((data) => {
    if (!filterValue) return true;

    switch (filterValue) {
      case "Ratings 4.0+":
        return data?.info?.avgRating >= 4;
      case "Offers":
        return data?.info?.aggregatedDiscountInfoV3?.subHeader ? true : false;
      case "Rs. 300 - 400":
        return (
          data?.info?.costForTwo?.split("")[0]?.slice(1) >= 300 &&
          data?.info?.costForTwo?.split("")[0]?.slice(1) <= 600
        );
      case "Less than 300":
        return data?.info?.costForTwo?.split("")[0]?.slice(1) <= 300;
      case "New on swiggy":
        return;
      case "Pure veg":
        return;
      case "Fast Delivery":
        return;
      default:
        return true;
    }
  });

  if (serviceData?.communication) {
    return (
      <div className="flex flex-col mt-40 justify-center items-center ">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          className="w-60"
        />

        <p>Unavaiable Service</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full ">
        { !onlineResData?.length ? (
          <SkeletonLoader />
        ) : (

          <div className="h-screen  flex flex-col justify-between ">
          <div className="flex justify-center mt-4">
            <div className="w-[75%] overflow-hidden">
              <DishName dishNameData={dishNameData} />

              <hr className="mt-12 mb-10 border" />

              <RestaurantName
                topAddress={topAddress}
                restaurantData={restaurantData}
              />

              <hr className="mt-12 mb-10 border" />

              <OnlineRestaurant
                onlineAddress={onlineAddress}
                onlineResData={filterValue ? filteredData : onlineResData}
              />

              <hr className="mt-12 mb-10 border" />
            </div>

            </div>
             <Footer />
          </div>
        )}

      </div>


    </>
  );
}

export default HeroSection;
