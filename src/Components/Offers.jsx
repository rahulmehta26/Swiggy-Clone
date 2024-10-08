/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DishItemCard from "./DishItemCard";
import { IoIosArrowDown } from "react-icons/io";
import Footer from "./Footer";

const Offers = () => {
  const [showInfo, setShowInfo] = useState(false);

  const data = useSelector((state) => state.offerSlice.offerData);

  const filteredData = data.filter(
    (item) =>
      item?.info?.aggregatedDiscountInfoV3?.header ||
      item?.info?.aggregatedDiscountInfoV3?.subHeader
  );

  filteredData;

  return (
    <>
      <div className="h-screen flex flex-col justify-between">
        <div className="w-[75%] mt-12 mx-auto mb-4">
          <div>
            <h2 className="text-[1.1rem] text-[#161A1F] font-medium ">
              <Link to={"/"}>Home / </Link>
              <span className="text-[#676A6D]">offers</span>
            </h2>

            <h1 className="text-[1.5rem] mt-3 text-[#161A1F] font-extrabold ">
              Restaurants With Great Offers Near Me
            </h1>
          </div>

          <div className="w-full mt-8 grid grid-cols-4 gap-10">
            {filteredData.map(({ info, cta: { link } }, index) => {
              return (
                <div
                  key={index}
                  className="hover:scale-95 duration-200 cursor-pointer"
                >
                  <DishItemCard {...info} link={link} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[85%]  mt-4 mx-auto mb-4">
          <hr className="w-full border border-1 border-[#E5E6E6]" />

          <div className="w-full pt-8 p-4 border border-[#E5E6E6] rounded-xl mt-16">
            <h1 className="text-[1.8rem] font-bold text-[#676A6D]">
              Get the best offers on the food from top restaurants near you
            </h1>

            <div className="space-y-4 text-[1rem] text-[#676A6D] mt-4 font-normal ">
              <p>
                Get ready for a scrumptious adventure filled with unbeatable
                offers on your favourite foods and restaurants. Whether you're
                in the mood for a cheesy pizza, a sizzling burger, or a
                delightful bowl of pasta, now is the perfect time to satisfy
                your cravings while saving big.
              </p>

              <p>
                All the top-rated restaurants and popular eateries are rolling
                out enticing deals and discounts that are too good to resist.
                From mouthwatering buy-one-get-one-free offers to irresistible
                combo meals, there's something for everyone on Swiggy to relish
                without breaking the bank.
              </p>

              {showInfo ? (
                <>
                  <p>
                    Imagine biting onto a juicy burger paired with a side of
                    crispy fries, all at a fraction of the regular price. Or how
                    about treating yourself to a cheesy, oven-fresh pizza with
                    your favourite toppings without worrying about the bill?
                    With these incredible offers, indulging in your beloved
                    dishes has never been more budget-friendly.
                  </p>

                  <p>
                    So, whether you're planning a cosy night in, a family feast,
                    or a fun dinner with friends, take advantage of these
                    fantastic deals. It's time to savour the flavours you adore
                    without emptying your wallet. Order now, support your local
                    restaurants, and make every meal a delightful and
                    cost-effective experience. Don't miss out – let your taste
                    buds rejoice, and your savings grow with these irresistible
                    food offers on Swiggy!
                  </p>
                </>
              ) : (
                <h1
                  className="text-[.9rem] cursor-pointer flex items-center font-bold text-[#FF5200] "
                  onClick={() => setShowInfo(true)}
                >
                  See more{" "}
                  <span>
                    <IoIosArrowDown className="w-4 h-4" />
                  </span>{" "}
                </h1>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Offers;
