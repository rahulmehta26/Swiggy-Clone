/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import DishName from "./DishName";
import RestaurantName from "./RestaurantName";
import OnlineRestaurant from "./OnlineRestaurant";
import { GeoCode } from "../Context/ContextApi";

function HeroSection() {

  const [restaurantData, setRestaurantData] = useState([])

  const [dishNameData, setDishNameData] = useState([])

  const [onlineResData, setOnlineResData] = useState([])

  const [topAddress, setTopAddress] = useState([])

  const [onlineAddress, setOnlineAddress] = useState([])

  const [serviceData, setServiceData] = useState([])

  const {geoCode : {lat, lng} } = useContext(GeoCode)

  // console.log(lat, lng)

  const fetchData = async() => { 
  
    const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)

    const response = await data.json()

    const resdata_result = response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    const dish_result = response?.data?.cards[0]?.card?.card?.imageGridCards?.info;

    const onlineResData_result = response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setRestaurantData(resdata_result)

    setDishNameData(dish_result)

    setOnlineResData(onlineResData_result)

    setServiceData(response?.data)

    setTopAddress(response?.data?.cards[1]?.card?.card?.header?.title)

    setOnlineAddress(response?.data?.cards[2]?.card?.card?.title)
  
  }
  

  useEffect(() => {

    fetchData()

  }, [lat, lng])

  if(serviceData?.communication){

    return <div className="flex flex-col mt-40 justify-center items-center ">

              <img 
              src = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" 
              className="w-60"
              />

              <p>Unavaiable Service</p>
          </div>
  }

  return (

    <>

      <div className="w-full flex justify-center mt-4">

        <div className="w-[75%] overflow-hidden">

          <DishName dishNameData = {dishNameData}/>

          <hr
        
          className='mt-12 mb-10 border'
          />

          <RestaurantName topAddress = {topAddress}  restaurantData = {restaurantData} />
          
          <hr
        
          className='mt-12 mb-10 border'
          />

          <OnlineRestaurant onlineAddress = {onlineAddress} onlineResData = {onlineResData} />

          <hr
        
          className='mt-12 mb-10 border'
          />

        </div>

      </div>

    </>
  );
}

export default HeroSection;
