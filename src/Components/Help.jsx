/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  faqS,
  generalIssue,
  hdfcCCFeatures,
  hdfcCCUsage,
  helpData,
  instamartOnboard,
  irctcFAQs,
  legalT_C,
  partnerOnboard,
  safetyEme,
  swiggyDineoutFAQs,
  swiggyMoneyFAQs,
  swiggyOneFAQs,
  swiggyUPIFaqs,
} from "../Utils/utility";
import HelpCard from "./HelpCard";

const Help = () => {
  const [isActive, setIsActive] = useState("Help with orders");
  const [activeFAQs, setActiveFAQs] = useState([]);

  const handleMenuClick = (title) => {
    setIsActive(title);

    if (title === "Help with orders") {
      return;
    }

    switch (title) {
      case "Swiggy One FAQs":
        setActiveFAQs(title === "Swiggy One FAQs" ? swiggyOneFAQs : null);
        break;

      case "General issues":
        setActiveFAQs(title === "General issues" ? generalIssue : null);
        break;

      case "Partner Onboarding":
        setActiveFAQs(title === "Partner Onboarding" ? partnerOnboard : null);
        break;

      case "Report Safety Emergency":
        setActiveFAQs(
          title === "Report Safety Emergency" ? safetyEme : null
        );
        break;

      case "Instamart Onboarding":
        setActiveFAQs(title === "Instamart Onboarding" ? instamartOnboard : null);
        break;

      case "Legal, Terms & Conditions":
        setActiveFAQs(
          title === "Legal, Terms & Conditions" ? legalT_C : null
        );
        break;

      case "FAQs":
        setActiveFAQs(title === "FAQs" ? faqS : null);
        break;

      case "Swiggy Money FAQs":
        setActiveFAQs(title === "Swiggy Money FAQs" ? swiggyMoneyFAQs : null);
        break;

      case "Swiggy Dineout FAQs":
        setActiveFAQs(title === "Swiggy Dineout FAQs" ? swiggyDineoutFAQs : null);
        break;

      case "IRCTC FAQs":
        setActiveFAQs(title === "IRCTC FAQs" ? irctcFAQs : null);
        break;

      case "Swiggy HDFC Bank Credit Card - Features":
        setActiveFAQs(
          title === "Swiggy HDFC Bank Credit Card - Features"
            ? hdfcCCFeatures
            : null
        );
        break;

      case "Swiggy HDFC Bank Credit Card - Usage":
        setActiveFAQs(
          title === "Swiggy HDFC Bank Credit Card - Usage"
            ? hdfcCCUsage
            : null
        );
        break;

      case "Swiggy UPI FAQs":
        setActiveFAQs(title === "Swiggy UPI FAQs" ? swiggyUPIFaqs : null);
        break;

      default:
        setActiveFAQs([]);
    }
  };

  return (
    <>
      <div className="w-full p-20 bg-[#37718E] ">
        <div className="pl-32">
          <h1 className="text-[1.9rem] text-white font-bold ">
            Help & Support
          </h1>

          <p className="text-[1rem] text-white font-normal">
            Let's take a step ahead and help you better.
          </p>
        </div>

        <div className="w-[90%] flex justify-between mt-8 p-12 mx-auto bg-white">
          <div className="w-[27rem] flex flex-col items-end py-6 bg-[#EDF1F7] ">
            {helpData?.map((data) => {
              return (
                <div
                  key={data.id}
                  className={` w-[22.5rem] pl-16  flex gap-x-3 cursor-pointer p-6 pr-0 ${
                    isActive === data.title ? "bg-white" : "bg-[#EDF1F7]"
                  } `}
                  onClick={() => handleMenuClick(data.title)}
                >
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

          <div className="w-[75%] mt-8 pl-10">
            <h1 className="text-[1.5rem] font-bold text-[#282C3F] ">
              {isActive === "Help with orders" ? "" : isActive}
            </h1>

            {isActive === "Help with orders" ? (
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
            ) : (
              <div>
                {activeFAQs?.map((data) => (
                  //  (data)
                  <HelpCard key={data.id} {...data} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
