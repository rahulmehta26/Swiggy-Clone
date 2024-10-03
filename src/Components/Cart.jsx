/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable use-isnan */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItem, deleteItem } from "../Redux/cartSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { loginToggleReducer } from "../Redux/toggleSlice";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { removeAddress, setAddress } from "../Redux/addressSlice";
import { nonVeg, veg } from "../image";
import { placeOrder } from "../Redux/orderSlice";

function Cart() {
  const [show, setShow] = useState(false);

  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const addressData = useSelector((state) => state.addressSlice);
  const orderData = useSelector((state) => state.orderSlice.orders);

  const emptyImg =
    "data:image/avif;base64,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";

  // const navigate = useNavigate()
  const dispatch = useDispatch();

  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleRemovefromCart = (id) => {

    if (cartData.length > 1) {
      const newCartData = cartData.filter((_, index) => index !== id);

      dispatch(deleteItem(newCartData));

      toast.success("Item removed");
    } else {
      handleClearCart();

      toast.success("Cart is clear");
    }
  };

  const totalAmount = cartData?.reduce((total, items) => {
    return total + items?.price || items?.defaultPrice;
  }, 0);

  const handleClearCart = () => {
    dispatch(clearCartItem());
  };

  const handlePlaceOrder = () => {
    if (!userInfo) {
      dispatch(loginToggleReducer());
      return;
    }

    if( addressData.length !== 0){

      if (cartData.length === 0 ) {
        toast.error("Nothing to place ");
      } else {
  
        dispatch(placeOrder(cartData))
        handleClearCart()
        toast.success("Order placed successfully");
      }
    } else{
      toast.error("Add address to deliver")
    }

    };


  const handleAddress = () => {
    setShow((prev) => !prev);
  };

  const handleSubmitAddres = () => {
    const addressInfo = { area, landmark, zipCode };

    if (zipCode.length === 6) {
      if (area.length !== 0 && landmark.length !== 0 && zipCode.length !== 0) {
        dispatch(setAddress(addressInfo));

        setShow((prev) => !prev);

        setLandmark("");

        setArea("");

        setZipCode("");
      } else {
        toast.error("Fill the address form");
      }
    } else {
      toast.error("Please check zipCode is correct");
    }
  };

  const handleRemoveAddress = () => {
    dispatch(removeAddress());
  };

  return (
    <div className="w-full relative">
      {cartData.length === 0 ? (
        <>
          <div className="w-full mt-28 flex flex-col items-center">
            <div className="w-72 h-64">
              <img src={emptyImg} className="w-full h-full object-contain " />
            </div>

            <h1 className="text-center mt-6 text-[1.25rem] font-bold text-[#535665] ">
              No Orders
            </h1>

            <p className="text-center text-[#7E808C] text-[.9rem] ">
              You haven't placed any order yet.
            </p>

            <Link to={"/"}>
              <button className="w-[16rem] text-white font-medium mt-4 text-[1rem] bg-[#FF5200] hover:shadow-md p-2">
                SEE RESTAURANTS NEAR YOU
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full ">

          <div className="w-[75%] flex gap-10 justify-between mx-auto p-2 ">

            <div className="w-[55%] my-6">
              {cartData?.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between mb-12 items-center"
                  >

                    <div className="flex gap-x-4" >

                    <div className="relative">
                      {data?.imageId && (
                        <img
                          src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/" +
                            data?.imageId
                          }
                          className="w-20 h-16 rounded-xl object-cover"
                          alt="food-item"
                        />
                      )}

                      <button
                        className={` w-[3.5rem] ml-4 py-.5 px-1 ${
                          data?.imageId && "absolute ml-0 top-[83%] -left-[5%]"
                        } bg-red-500 border rounded-lg shadow-md text-white text-[.65rem] font-bold `}
                        onClick={() => handleRemovefromCart(index)}
                      >
                        Remove
                      </button>

                    </div>

                    <div>

                     <img 
                     src={data?.itemAttribute?.vegClassifier === "veg" ? veg : nonVeg }  
                     className="w-4 h-4"
                     />

                    <h1
                    className="text-[#161A1F] font-medium text-[1rem] "
                    >{data?.name || data?.resName}</h1>
                    </div>


                    </div>

                    {
                    data.price && 
                    <p
                    className="font-bold text-[#161A1F]"
                    >₹ {data?.price / 100}</p>}

                  </div>
                );
              })}

              <h1 
              className="text-[1rem] text-[#161A1F] text-right font-medium "
              >Total Amount:-  <span className="text-[#1C923C] font-bold ">₹ {totalAmount / 100}</span> </h1>

              <div 
              className="flex mt-6 gap-x-6 items-center"
              >

              <button
                className="w-28 p-2 bg-[#EF4444]  font-medium text-white"
                onClick={handleClearCart}
              >
                Clear
              </button>

              <button
                className="w-28 p-2 bg-[#66B246] font-medium text-white"
                onClick={handlePlaceOrder}
              >
                Place order
              </button>
                
                </div> 
            </div>

            <div className="overflow-y-scroll overflow-x-hidden h-[24rem]">
              <div className="w-[35%]  bg-white p-4">
                <div
                  className="w-[22rem] h-[14rem] flex flex-col justify-between border border-dashed border-[#E9E9EB] hover:shadow-lg p-4"
                  onClick={handleAddress}
                >
                  <div className="flex items-center gap-x-6">
                    <MdOutlineAddLocationAlt className="w-6 h-6" />

                    <h1 className="text-[1rem] font-medium text-[#282C3F] ">
                      Add new Address
                    </h1>
                  </div>

                  <button className="w-[8rem] text-[#66B246] mb-8 ml-12 font-medium border border-[#66B246] p-2">
                    ADD NEW
                  </button>

                  {/* <GoLocation className="w-6 h-5" /> */}
                </div>
              </div>

              <div className="w-[35%]  bg-white p-4">
                <div className="w-[22rem] h-[14rem] flex flex-col justify-between border border-dashed border-[#E9E9EB] hover:shadow-lg p-4">
                  <div className="flex  gap-x-6">
                    <GoLocation className="w-5 h-5" />

                    <div>
                      <h1 className="text-[.85rem] font-medium text-[#93959F] ">
                        {addressData.area} <span> {addressData.zipCode}</span>
                      </h1>

                      <p className="text-[#93959F] mt-2 font-medium text-[.85rem] ">
                        {addressData.landmark}
                      </p>
                    </div>
                  </div>

                  <div className=" w-full flex justify-between gap-x-4 items-center">
                    <button className="w-full text-white bg-[#66B246] mb-8  font-medium border border-[#66B246] p-2">
                      DELIVER HERE
                    </button>

                    <button
                      className="w-full text-white bg-[#66B246] mb-8  font-medium border border-[#66B246] p-2"
                      onClick={handleRemoveAddress}
                    >
                      DELETE ADDRESS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {show && (
        <>
          <div className="w-full flex justify-center items-center fixed inset-0 z-40 bg-black/50">
            <div className="w-[24rem] rounded-lg bg-white p-4 ">
              <div
                className="w-8 h-8 cursor-pointer rounded-full p-1.5 bg-black"
                onClick={handleAddress}
              >
                <RxCross2 className="w-5 h-5 text-white" />
              </div>

              <input
                className="w-[95%] py-4 px-4 border focus:outline-none mt-6 text-black"
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />

              <input
                className="w-[95%] py-4 px-4 border focus:outline-none mt-2 text-black"
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />

              <input
                className="w-[95%] py-4 px-4 border focus:outline-none mt-2 text-black"
                placeholder="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />

              <button
                className="w-[95%] mt-6 bg-[#60B246] text-white text-[1rem] font-medium p-2 "
                onClick={handleSubmitAddres}
              >
                Add Address
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
