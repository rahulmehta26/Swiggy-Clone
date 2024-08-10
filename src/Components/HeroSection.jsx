import React, { useEffect, useState } from "react";
import DishName from "./DishName";
import RestaurantName from "./RestaurantName";
import OnlineRestaurant from "./OnlineRestaurant";

function HeroSection() {

  const [restaurantData, setRestaurantData] = useState([])

  const [dishNameData, setDishNameData] = useState([])

  const [onlineResData, setOnlineResData] = useState([])

  const fetchData = async() => { 
  
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")

    const response = await data.json()

    const resdata_result = response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    const dish_result = response?.data?.cards[0]?.card?.card?.imageGridCards?.info;

    const onlineResData_result = response?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setRestaurantData(resdata_result)

    setDishNameData(dish_result)

    setOnlineResData(onlineResData_result)
  
  }
  

  useEffect(() => {

    fetchData()

  }, [])

  return (

    <>

      <div className="w-full flex justify-center mt-4">

        <div className="w-[75%] overflow-hidden">

          <DishName dishNameData = {dishNameData}/>

          <hr
        
          className='mt-12 mb-10 border'
          />

          <RestaurantName restaurantData = {restaurantData} />
          
          <hr
        
          className='mt-12 mb-10 border'
          />

          <OnlineRestaurant onlineResData = {onlineResData} />

          <hr
        
          className='mt-12 mb-10 border'
          />

        </div>

      </div>

    </>
  );
}

export default HeroSection;
