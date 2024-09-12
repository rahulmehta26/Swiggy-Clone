/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import FoodInfo from "./Components/FoodInfo";
import { CartData, GeoCode, Visibility } from "./Context/ContextApi";
import { useEffect, useState } from "react";
import Cart from "./Components/Cart";
import { useSelector } from "react-redux";

function App() {

  const isVisibile = useSelector((state) => state.toggleSlice.searchBarToggle )

  const [geoCode, setGeoCode] = useState({
    lat: 15.1393932,
    lng: 76.9214428,
  });

  return (

      <GeoCode.Provider value={{ geoCode, setGeoCode }}>

          <div
            className={`${isVisibile ? "max-h-screen overflow-hidden" : ""}`}
          >

            <Routes>

              <Route path="/" element={<Header />}>

                <Route path="/" element={<HeroSection />} />

                <Route path="/foodInfo/:id" element={<FoodInfo />} />

                <Route path = "/cart" element = {<Cart/>} />

                <Route path="*" element = {<h1>Page not found 404</h1>} />

              </Route>

            </Routes>

          </div>

      </GeoCode.Provider>

  );
}

export default App;
