/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { signinData } from "../Utils/utility";
import { SiSwiggy } from "react-icons/si";
import { FaCreditCard, FaHeart } from "react-icons/fa";
import { IoBagHandle, IoSettingsSharp } from "react-icons/io5";
import { FaLocationPin } from "react-icons/fa6";
import { GoLocation } from "react-icons/go";
import { removeAddress } from "../Redux/addressSlice";
import { nonVeg, veg } from "../image";
import useWindowSize from "./useWindowSize";

const SigninPage = () => {
  const [isToggle, setIsToggle] = useState(true);

  const addressData = useSelector((state) => state.addressSlice.addresses);

  const dataAddress = addressData?.flat(Infinity) || []

  const placedOrder = useSelector(
    (state) => state.orderSlice.orders.flat(),
    shallowEqual
  );

  const dispatch = useDispatch();

  const { height } = useWindowSize();

  const totalAmount = placedOrder?.reduce((total, items) => {
    return total + items?.price || items?.defaultPrice;
  }, 0);

  const handleRemoveAddress = (val) => {

    const exactData = dataAddress.filter((data) => data?.id !== val )

    dispatch(removeAddress(exactData));
  };

  const toggleValue = () => {
    setIsToggle((prev) => !prev);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [isActive, setIsActive] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "Orders";
  });

  const handleMenuClick = (title) => {
    setIsActive(title);
    navigate(`/my-account?tab=${title}`);
  };

  const userInfo = useSelector((state) => state.authSlice.userInfo);

  const iconList = {
    IoBagHandle: IoBagHandle,
    SiSwiggy: SiSwiggy,
    FaHeart: FaHeart,
    FaCreditCard: FaCreditCard,
    FaLocationPin: FaLocationPin,
    IoSettingsSharp: IoSettingsSharp,
  };

  if (userInfo === null) {
    return navigate("/");
  }

  return (
    <>
      {isActive === "Favourites" ? (
        <div className=" w-full space-y-3  flex flex-col mt-24 items-center">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/empty_404_3x_rgdw87"
            className="w-[20rem] h-[18rem] object-contain "
          />

          <h1 className="text-[2rem] text-[#282C3F] font-bold ">
            Page not found
          </h1>

          <p className="text-center text-[#A7A9B1] text-[.9rem] font-medium w-[30%] ">
            Uh-oh! Looks like the page you are trying to access, doesn't exist.
            Please start afresh.
          </p>

          <Link to={"/"}>
            <button className="bg-[#FF5200] p-2 px-4 text-white font-semibold ">
              Go Home
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div
            className={`w-full p-20 ${
              height >= 180.5 ? "bg-white" : "bg-[#37718E]"
            } `}
          >
            <div className="flex justify-between items-center px-32">
              <div>
                <h1 className="text-white font-bold text-[1.8rem] ">
                  {userInfo.name}
                </h1>

                <h3 className="text-white font-normal text-[1.1rem]">
                  {" "}
                  phone number <span> email address</span>{" "}
                </h3>
              </div>

              <div>
                <button className="w-[8] p-2 border border-1 px-4 hover:bg-[#E6E6E6] text-[.9rem] font-bold hover:text-[#37718E] border-[#E6E6E6] text-white ">
                  EDIT PROFILE
                </button>
              </div>
            </div>

            <div className="w-[90%] flex justify-between mt-10 p-12 mx-auto bg-white">
              <div className="w-[17rem] flex flex-col items-end py-6 h-[36rem] bg-[#EDF1F7] ">
                {signinData?.map((data) => {
                  const IconItems = iconList[data.image];

                  return (
                    <div
                      key={data.id}
                      className={` w-[15.5rem]  flex gap-x-3 cursor-pointer p-6 ${
                        isActive === data.title ? "bg-white" : "bg-[#EDF1F7]"
                      } `}
                      onClick={() => handleMenuClick(data.title)}
                    >
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full ${
                          isActive === data.title
                            ? "bg-[#282C3F]"
                            : "bg-[#535665]"
                        } `}
                      >
                        <IconItems
                          className={`w-3.5 h-3.5 ${
                            isActive === data.title
                              ? "text-white"
                              : "text-[#EDF1F7]"
                          }  `}
                        />
                      </div>

                      <h1
                        className={` text-[.95rem] font-semibold ${
                          isActive === data.title
                            ? "text-[#282C3F]"
                            : "text-[#535665] hover:text-[#282C3F] hover:text-[1.05rem]"
                        }  `}
                      >
                        {data.title}
                      </h1>
                    </div>
                  );
                })}
              </div>

              <div className="w-[75%] pl-10">
                {isActive === "Orders" ? (
                  placedOrder.length ? (
                    <div className="w-[100%] mt-10">
                      <h1 className="text-[1.5rem] font-bold text-[#282C3F] ">
                        All orders
                      </h1>

                     <Link to={`/`} >
                      <div className="mt-6">
                        {placedOrder?.map((data, index) => {
                          return (
                            <div
                              key={index}
                              className="flex justify-between mb-12 items-center"
                            >
                              <div className="flex gap-x-4">
                                <div className="w-36 h-28">
                                  {data?.imageId && (
                                    <img
                                      src={
                                        "https://media-assets.swiggy.com/swiggy/image/upload/" +
                                        data?.imageId
                                      }
                                      className="w-full h-full  object-cover"
                                      alt="food-item"
                                    />
                                  )}
                                </div>

                                <div>
                                  <img
                                    src={
                                      data?.itemAttribute?.vegClassifier ===
                                      "veg"
                                        ? veg
                                        : nonVeg
                                    }
                                    className="w-4 h-4"
                                  />

                                  <h1 className="text-[#161A1F] font-medium text-[1rem] ">
                                    {data?.name || data?.resName}
                                  </h1>
                                </div>
                              </div>

                              {data.price && (
                                <p className="font-bold text-[#161A1F]">
                                  ₹ {data?.price / 100}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      </Link>

                      <h1 className="text-[1rem] text-[#161A1F] text-right font-medium ">
                        Total Amount:-{" "}
                        <span className="text-[#1C923C] font-bold ">
                          ₹ {totalAmount / 100}
                        </span>{" "}
                      </h1>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_262/empty-orders-image_acrbbw"
                        className="w-[24rem] h-[24rem] object-contain"
                      />

                      <div>
                        <h1 className="text-center text-[1.25rem] font-bold text-[#535665] ">
                          No Orders
                        </h1>

                        <p className="text-center text-[#7E808C] text-[.9rem] ">
                          You haven't placed any order yet.
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  " "
                )}

                {isActive === "Swiggy One" ? (
                  <div className="flex w-[100%] justify-between mt-10 ">
                    <div className="space-y-3">
                      <h1 className="text-[1.4rem] text-[#282C3F] font-bold ">
                        Swiggy One
                      </h1>

                      <p className=" text-[.9rem] text-[#686B78] ">
                        Get free delivery and extra discounts all across Swiggy.
                      </p>

                      <p className=" text-[.9rem] text-[#686B78] ">
                        Your Swiggy One benefits can be availed only on the
                        Swiggy App.
                      </p>
                      <div className="flex w-[90%] cursor-pointer gap-x-6">
                        <a
                          href="https://apps.apple.com/in/app/swiggy-food-grocery-dineout/id989540920"
                          target="_blank"
                        >
                          <img
                            src="data:image/avif;base64,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"
                            className="w-44 h-16 hover:scale-110 hover:duration-100 object-contain "
                          />
                        </a>

                        <a
                          href="https://play.google.com/store/apps/details?id=in.swiggy.android"
                          target="_blank"
                        >
                          <img
                            src="data:image/avif;base64,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"
                            className="w-[10.9rem] h-16 object-contain hover:scale-110 hover:duration-100"
                          />
                        </a>
                      </div>
                    </div>

                    <div className="w-[25rem] h-[25rem] ">
                      <img
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_720,h_660/swiggy_one/my_account_super"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  " "
                )}

                {isActive === "Payments" ? (
                  <div className="flex w-[100%] justify-between mt-10 ">
                    <h1 className="text-[1.5rem] font-bold text-[#282C3F] ">
                      Payments
                    </h1>
                  </div>
                ) : (
                  " "
                )}

                {isActive === "Addresses" ? (
                  <div className=" w-[100%]  mt-10 ">
                    <h1 className="text-[1.5rem] font-bold text-[#282C3F] ">
                      Manage Addresses
                    </h1>

                    <div className="flex w-[80%] flex-wrap justify-between">
                      {dataAddress &&
                        dataAddress?.map((data, index) => {
                          return (
                            <div
                              key={index}
                              className="w-[35%]  bg-white pt-4 px-4"
                            >
                              <div className="w-[22rem] flex flex-col space-y-8 justify-between border border-dashed border-[#E9E9EB] hover:shadow-lg p-4">
                                <div className="flex  gap-x-6">
                                  <GoLocation className="w-5 h-5" />

                                  <div>
                                    <h1 className="text-[.85rem] font-medium text-[#93959F] ">
                                      {data?.area} <span> {data?.zipCode}</span>
                                    </h1>

                                    <p className="text-[#93959F] mt-2 font-medium text-[.85rem] ">
                                      {data?.landmark}
                                    </p>
                                  </div>
                                </div>

                                <div className=" w-full flex justify-between gap-x-4 items-center">
                                  <button className="w-full text-white bg-[#66B246]  font-medium border border-[#66B246] p-2">
                                    DELIVER HERE
                                  </button>

                                  <button
                                    className="w-full text-white bg-[#66B246]  font-medium border border-[#66B246] p-2"
                                    onClick={() => handleRemoveAddress(data.id)}
                                  >
                                    DELETE ADDRESS
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : (
                  " "
                )}

                {isActive === "Settings" ? (
                  <div className=" w-[100%] mt-10 ">
                    <h1 className="text-[1.5rem] font-bold text-[#282C3F] ">
                      SMS Preferences
                    </h1>

                    <div className="w-full border border-[#D4D5D9] mt-10 p-3">
                      <p className="text-[.8rem] text-[#686B78] font-normal ">
                        Order related SMS cannot be disabled as they are
                        critical to provide service
                      </p>
                    </div>

                    <div className="w-full flex py-6 items-center gap-x-6 border border-[#D4D5D9] mt-10 p-3">
                      <p className="text-[1.1rem] text-[#282C3F] font-semibold ">
                        Recommendations & Reminders
                      </p>

                      <button
                        onClick={toggleValue}
                        className={`w-[3.2rem] p-1 font-semibold ${
                          isToggle ? "bg-[#FF5200]" : "bg-[#D4D5D9]"
                        } rounded-2xl `}
                      >
                        <p
                          className={`bg-white w-[1.2rem] h-[1.2rem] text-[.5rem] rounded-full ${
                            isToggle ? "translate-x-6" : "translate-x-0"
                          } duration-700  `}
                        ></p>
                      </button>

                      <p className=" border h-16 border-t-8 border-[#D4D5D9] "></p>

                      <p className="text-[.8rem] w-[45%] text-[#686B78] font-normal ">
                        Keep this on to receive offer recommendations & timely
                        reminders based on your interests
                      </p>
                    </div>
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SigninPage;
