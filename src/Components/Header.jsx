/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import swiggy from "/swiggy.png";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { BiSolidOffer } from "react-icons/bi";
import { MdAssignmentInd } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  loginToggleReducer,
  searchBarToggleReducer,
} from "../Redux/toggleSlice";
import { setGeoCode } from "../Redux/geoCodeSlice";
import { FcGoogle } from "react-icons/fc";
import { addUserInfo } from "../Redux/authSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Auth/firebaseAuth";
import toast from "react-hot-toast";
import { setSignupData } from "../Redux/signupSlice";

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
      path: "/support",
    },

    {
      name: "Sign In",
      image: "MdAssignmentInd",
      path: "/my-account",
    },

    {
      name: "Cart",
      image: "FaShoppingCart",
      path: "/cart",
    },
  ];

  const isVisibile = useSelector((state) => state.toggleSlice.searchBarToggle);

  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);

  const signupData = useSelector((state) => state.signupSlice);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchData, setSearchData] = useState([]);

  const [searchLoc, setSearchLoc] = useState([]);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [createAccount, setCreateAccount] = useState(false);

  const cartData = useSelector((state) => state.cartSlice.cartItems);

  const userInfo = useSelector((state) => state.authSlice.userInfo);

  const handleSignup = () => {

    if (createAccount && phoneNumber && name && email) {
      const signupData = {
        phoneNumber,
        name,
        email,
      };
      dispatch(setSignupData(signupData)); 
      setCreateAccount(false)
       ("Signup data dispatched:", signupData);
    } else {
      toast.error("Please fill all the fields before continuing.");

      
    }
  };

  const handleAuthSignin = async () => {
    const res = await signInWithPopup(auth, provider);

    const userData = {
      name: res.user.displayName,
      photo: res.user.photoURL,
    };

    dispatch(addUserInfo(userData));
    navigate("/");
    handleLoginToggle(false);
  };

  const handleLoginToggle = () => {
    dispatch(loginToggleReducer());
  };

  const searchHandle = () => {
    dispatch(searchBarToggleReducer());
  };

  const searchResult = async (value) => {
    if (value == "" || value == " ") return;

    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`
    );

    const data = await res.json();

    setSearchData(data?.data);

    
  };

  const geoCodeData = async (id) => {
    if (id == "" || id == " ") return;

    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
    );

    const data = await res.json();

    dispatch(
      setGeoCode({
        lat: data?.data[0]?.geometry?.location?.lat,
        lng: data?.data[0]?.geometry?.location?.lng,
      })
    );

    searchHandle();

    setSearchLoc(data?.data[0]?.formatted_address);

  };

  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <div
            onClick={searchHandle}
            className={
              "w-full bg-black/50 z-30 h-full absolute " +
              (isVisibile ? "visible " : " invisible")
            }
          ></div>

          <div
            className={
              "w-[38%] flex justify-end h-full bg-white absolute z-30 duration-500 " +
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

        <div className="w-full top-0 z-10 shadow-md  bg-white sticky">
          <div className="w-full flex items-center justify-center py-4">
            <div className="w-[80%] flex items-center justify-between">
              <div className="flex items-center gap-7">
                <Link to={"/"}>
                  <div className="size-12 cursor-pointer">
                    <img className="w-full, h-full" src={swiggy} />
                  </div>
                </Link>

                <div
                  className="flex w-full items-center cursor-pointer group"
                  onClick={searchHandle}
                >
                  <p className="font-bold border-b-2 text-[#424549] border-[#424549] group-hover:border-[#FC8019] group-hover:text-[#FC8019]">
                    work
                  </p>

                  <p className="font-normal text-sm max-w-56 line-clamp-1 ml-2 text-[#93959F] ">
                    {searchLoc}
                  </p>

                  <IoIosArrowDown className="size-4 cursor-pointer text-[#FC8019] group-hover:text-[#FC8019]" />
                </div>
              </div>

              <div className="flex items-center gap-12 ">
                {navItems.map((items, i) => {
                  const IconComponent = iconMapping[items.image];

                  return (
                    <Link
                      key={i}
                      to={items.path}
                      onClick={(e) => {
                        if (items.name === "Sign In" && !userInfo) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div
                        className={`flex items-center group gap-2 cursor-pointer text-[#424549] font-semibold ${
                          items.name === "Swiggy Corporate"
                            ? ""
                            : "hover:text-[#FC8019]"
                        } `}
                      >
                        <div
                          className="flex items-center gap-2"
                          onClick={
                            items.name === "Sign In" && userInfo === null
                              ? handleLoginToggle
                              : ""
                          }
                        >
                          {items.name === "Sign In" && userInfo ? (
                            <img
                              src={userInfo?.photo}
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <IconComponent
                              className={`size-[1.5 rem] ${
                                cartData.length <= 0 || items.name !== "Cart"
                                  ? ""
                                  : "text-[#60B246] group-hover:text-[#FC8019] "
                              } `}
                            />
                          )}

                          <p className="text-[1.1 rem] hover:text-[#FC8019]">
                            {items.name === "Sign In" && userInfo
                              ?  signupData.name || userInfo?.name 
                              : items.name}
                          </p>
                        </div>

                        {items.name === "Cart" && cartData.length !== 0 && (
                          <p>{cartData.length}</p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div
            onClick={handleLoginToggle}
            className={
              "w-full bg-black/50 z-30 h-full absolute " +
              (loginVisible ? "visible " : " invisible")
            }
          ></div>

          <div
            className={
              "w-[35%] h-full bg-white fixed z-30 duration-500 " +
              (loginVisible ? "right-0" : "-right-full")
            }
          >
            <div className="flex w-[80%] flex-col gap-y-3 py-8 px-9">
              <RxCross1
                className="size-[1.15rem] cursor-pointer"
                onClick={handleLoginToggle}
              />

              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <h1 className="text-[#282C3F] font-semibold text-3xl ">
                    {!createAccount ? "Login" : "Sign up"}
                  </h1>

                  <p className="text-[.8rem] font-semibold text-[#282C3F] ">
                    or{" "}
                    <span
                      className="text-[#FF5200] cursor-pointer "
                      onClick={() => setCreateAccount((prev) => !prev)}
                    >
                      {!createAccount
                        ? "create an account"
                        : "login to your account"}
                    </span>
                  </p>

                  <hr className="w-8 border-2 border-black" />
                </div>

                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                  className="w-28 h-28 object-cover"
                />
              </div>

              {
                !createAccount  &&

              <input
                className="w-[23rem] py-6 px-4 border focus:outline-none mt-6 text-black"
                placeholder="Phone number"
              />
              }


              {
                createAccount && 

                <>

              <input
                className="w-[23rem] py-6 px-4 border focus:outline-none mt-6 text-black"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
                
                <input
                className="w-[23rem] py-6 px-4 border focus:outline-none mt-2 text-black"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

                <input
                className="w-[23rem] py-6 px-4 border focus:outline-none mt-2 text-black"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

                </>
              }

              <button 
              className="w-[23rem] py-3 px-4 bg-[#FF5200] text-white font-semibold mt-2"
              onClick={!createAccount ? "" : handleSignup}
              >
                {!createAccount ? "Login" : "Continue"}
              </button>

              {!createAccount && (
                <>
                  <p className="text-[.8rem] font-medium text-[#282C3F] text-center ">
                    or login with{" "}
                  </p>

                  <div className="w-full ">
                    <FcGoogle
                      className="w-8 h-8 mx-auto cursor-pointer"
                      onClick={handleAuthSignin}
                    />
                  </div>
                </>
              )}

              <p className="text-[.8rem] font-medium text-[#282C3F] cursor-pointer ">
                {" "}
                <span className="text-[#686B78] cursor-default ">
                  By clicking on Login, I accept the
                </span>{" "}
                Terms & Conditions & Privacy Policy
              </p>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default Header;
