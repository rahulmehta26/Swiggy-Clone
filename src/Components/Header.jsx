/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import swiggy from "/swiggy.png";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { BiSolidOffer } from "react-icons/bi";
import {
  MdAssignmentInd,
  MdMyLocation,
  MdOutlineMyLocation,
} from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
import { CartData, GeoCode, Visibility } from "../Context/ContextApi";
import { RxCross1 } from "react-icons/rx";
import { VscHistory } from "react-icons/vsc";
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import toggleSlice, { searchBarToggleReducer } from "../Redux/toggleSlice";

function Header() {
  const iconMapping = {
    HiMiniBuildingOffice: HiMiniBuildingOffice,
    FiSearch: FiSearch,
    BiSolidOffer: BiSolidOffer,
    IoHelpBuoyOutline: IoHelpBuoyOutline,
    MdAssignmentInd: MdAssignmentInd,
    FaShoppingCart: FaShoppingCart,
  };

  const navItems = [
    {
      name: "Swiggy Corporate",
      image: "HiMiniBuildingOffice",
      path: "/corporate",
    },

    {
      name: "Search",
      image: "FiSearch",
      path: "/search",
    },

    {
      name: "Offers",
      image: "BiSolidOffer",
      path: "/offers",
    },

    {
      name: "Help",
      image: "IoHelpBuoyOutline",
      path: "/help",
    },

    {
      name: "Sign In",
      image: "MdAssignmentInd",
      path: "/signIn",
    },

    {
      name: "Cart",
      image: "FaShoppingCart",
      path: "/cart",
    },
  ];

  // const { isVisibile, setIsVisibile } = useContext(Visibility);

  const isVisibile = useSelector((state) => state.toggleSlice.searchBarToggle)

  const disPatch = useDispatch()

  const [searchData, setSearchData] = useState([]);

  const [searchLoc, setSearchLoc] = useState([]);

  const { setGeoCode } = useContext(GeoCode);

  const cartData = useSelector((state) => state.cartSlice.cartItems )

  const searchHandle = () => {

        disPatch(searchBarToggleReducer())

  };

  const searchResult = async (value) => {
    if (value == "" || value == " ") return;

    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`
    );

    const data = await res.json();

    setSearchData(data?.data);

    // console.log(data)
  };

  const geoCodeData = async (id) => {
    if (id == "" || id == " ") return;

    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
    );

    const data = await res.json();

    setGeoCode({
      lat: data?.data[0]?.geometry?.location?.lat,
      lng: data?.data[0]?.geometry?.location?.lng,
    });

    searchHandle();

    setSearchLoc(data?.data[0]?.formatted_address);

    // console.log( data )
  };

  return (
    
    <>

    <div className="w-full">

        <div className="w-full relative">
          <div
            className={`bg-black/50 w-full h-full absolute z-10 ${
              isVisibile ? "visible" : "invisible"
            } `}
            onClick={searchHandle}
          ></div>

          <div
            className={
              "w-[38%] flex justify-end h-full bg-white absolute z-20 duration-500 " +
              (isVisibile ? "left-0" : "-left-[100%]")
            }
          >
            <div className="flex flex-col gap-y-3 py-8 px-12">
              <RxCross1
                className="size-[1.15rem] cursor-pointer"
                onClick={searchHandle}
              />

              <input
                className="w-[23rem] py-3 px-4 border focus:outline-none mt-6 shadow-lg focus:shadow-lg text-black"
                onChange={(e) => searchResult(e.target.value)}
                placeholder="Search for area, street name.."
              />

              <div className="w-[23rem] my-4 py-3 px-2">
                <ul>
                  {searchData.map((items, index) => {
                    
                    const isLast = index === searchData.length - 1;

                    return (
                      <>
                        <div className="flex">
                          <GoLocation className="w-4 mt-1 h-4" />

                          <li
                            key={index}
                            onClick={() => geoCodeData(items?.place_id)}
                            className="cursor-pointer ml-3 text-[#161A1F] font-[500] hover:text-[#FF6B00]"
                          >
                            {items?.structured_formatting?.main_text}
                            <p className="text-[#969DA5] text-[.825rem] font-normal">
                              {items?.structured_formatting?.secondary_text}
                            </p>{" "}
                          </li>
                        </div>

                        {!isLast && (
                          <hr className="border-dashed my-6 ml-7 border-[#969DA5]" />
                        )}
                      </>
                    );
                  })}
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="w-full flex  sticky justify-center shadow-lg shadow-slate-100 py-4">
          <div className="w-[80%] flex items-center justify-between">
            <div className="flex items-center gap-7">
              <Link to={"/"}>
                <img className="size-12 cursor-pointer" src={swiggy} />
              </Link>

              <div
                className="flex w-full items-center cursor-pointer group"
                onClick={searchHandle}
              >
                <p className="font-bold border-b-2 text-[#424549] border-[#424549] group-hover:border-[#FC8019] group-hover:text-[#FC8019]">
                  other
                </p>

                <p className="font-normal text-sm w-56 line-clamp-1 ml-2 text-[#93959F] ">
                  {searchLoc}
                </p>

                <IoIosArrowDown className="size-4 cursor-pointer text-[#FC8019] group-hover:text-[#FC8019]" />
              </div>
            </div>

            <div className="flex items-center gap-12 ">
              {navItems.map((items, i) => {
                const IconComponent = iconMapping[items.image];

                return (
                  <Link key={i} to={items.path}>
                    <div
                      className={`flex items-center gap-2 cursor-pointer text-[#424549] font-semibold ${
                        items.name === "Swiggy Corporate"
                          ? ""
                          : "hover:text-[#FC8019]"
                      } `}
                    >
                      <IconComponent className="size-[1.5 rem]" />

                      <p className="text-[1.1 rem] hover:text-[#FC8019]">
                        {items.name}
                      </p>

                      {
                        items.name === 'Cart' && cartData.length !== 0 && <p>{cartData.length}</p>
                      }

                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

      <Outlet />

    </div>

    </>
  );
}

export default Header;
