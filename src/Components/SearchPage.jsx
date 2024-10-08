/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResDish } from "../Redux/toggleSlice";
import DishesCard from "./DishesCard";
import RestaurantCard from "./RestaurantCard";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Dishes");
  const [dishesInfo, setDishesInfo] = useState([]);
  const [restaurantsInfo, setRestaurantsInfo] = useState([]);
  const [sameResDishData, setSameResDishData] = useState([]);
  const [selectedResDish, setSelectedResDish] = useState(null);

  const filterOption = [
    {
      id: "1",
      filterName: "Restaurant",
    },

    {
      id: "2",
      filterName: "Dishes",
    },
  ];

  const handleFilterActive = (filterName) => {
    const info = activeFilter === filterName ? activeFilter : filterName;

    setActiveFilter(info);
  };

  const { lat, lng } = useSelector((state) => state.geoCodeSlice);

  const sameResDishToggle = useSelector(
    (state) => state.toggleSlice.similarResDish.sameResDishToggle
  );

  const { city, resId, itemId, resLocation } = useSelector(
    (state) => state.toggleSlice.similarResDish
  );

  const dispatch = useDispatch();

  const fetchSameResDish = async () => {
    let encodedPath = encodeURIComponent(`/city/${city}/${resLocation}`);

    let res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
    );

    let dishData = await res.json();

    setSelectedResDish(dishData?.data?.cards[1]);

    setSameResDishData(dishData?.data?.cards[2]?.card?.card?.cards);

    dispatch(resetSimilarResDish());
  };

  function handleSearchQuery(e) {
    let val = e.target.value;
    if (e.keyCode == 13) {
      setSearchQuery(val);
      setSelectedResDish(null);
      setDishesInfo([]);
    }
  }

  const fetchDishesInfo = async () => {
    let res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`
    );

    let dishData = await res.json();

    setDishesInfo(
      dishData?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.filter(
        (data) => data?.card?.card?.info
      )
    );
  };

  const fetchRestaurantsInfo = async () => {
    let res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`
    );

    let restaurantData = await res.json();

    setRestaurantsInfo(
      restaurantData?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter(
        (data) => data?.card?.card?.info
      )
    );
  };

  useEffect(() => {
    if (sameResDishToggle) {
      fetchSameResDish();
    }
  }, [sameResDishToggle]);

  useEffect(() => {
    fetchDishesInfo();
    fetchRestaurantsInfo();
  }, [searchQuery]);

  return (
    <div className="w-full bg-white">
      <div className="w-[60%] mx-auto px-8 mt-4">
        <div className="w-full border flex items-center border-[#BEBFC5] rounded-md p-3 ">
          <input
            onKeyDown={handleSearchQuery}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            className="w-full text-[#282C3F] font-medium placeholder:font-semibold placeholder:text-[#686B78] outline-none"
            placeholder="Search for restaurants and food"
          />

          {searchQuery.length === 0 ? (
            <FiSearch className="size-6 cursor-pointer text-[#686B78]" />
          ) : (
            <RxCross2
              onClick={() => setSearchQuery("")}
              className="size-6 cursor-pointer text-[#686B78]"
            />
          )}
        </div>

        {searchQuery && !selectedResDish && (
          <div className="my-6 gap-x-2 flex">
            {filterOption?.map((data) => {
              return (
                <div key={data.id}>
                  <button
                    className={` fliterBtn flex text-[#414449] text-[.85rem] font-medium items-center gap-x-2 ${
                      activeFilter === data.filterName
                        ? "bg-[#3E4152] text-white "
                        : ""
                    } `}
                    onClick={() => handleFilterActive(data.filterName)}
                  >
                    <p>{data?.filterName}</p>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

{
  searchQuery &&

      <div className="w-[60%] mx-auto px-8">
        <div className="w-full grid grid-cols-2 gap-x-3 gap-y-4 bg-[#F3F4F5] px-4 py-6">
          {selectedResDish ? (
            <>
              <div className="w-full">
                <h1 className="text-[.9rem] mb-6 text-[rgb(40,44,63)] font-bold  ">
                  Item added to cart
                </h1>

                <DishesCard data={selectedResDish?.card?.card} />

                <h1 className="text-[1.1rem] mt-6 text-[#525665] font-medium ">
                  More dishes from this restaurant
                </h1>
              </div>

              <br />

              {sameResDishData?.map((data, index) => (
                <DishesCard
                  key={index}
                  data={{
                    ...data?.card,
                    restaurant: selectedResDish?.card?.card?.restaurant,
                  }}
                />
              ))}
            </>
          ) : activeFilter === "Dishes" ? (
            dishesInfo?.map((data, index) => {
              return <DishesCard key={index} data={data?.card?.card} />;
            })
          ) : (
            restaurantsInfo?.map((data, index) => {
              return <RestaurantCard key={index} data={data?.card?.card} />;
            })
          )}
        </div>
      </div>
}

    </div>
  );
};

export default SearchPage;
