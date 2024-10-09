/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import HeroSection from "./Components/HeroSection";
import FoodInfo from "./Components/FoodInfo";
import Cart from "./Components/Cart";
import { useSelector } from "react-redux";
import SigninPage from "./Components/SigninPage";
import SearchPage from "./Components/SearchPage";
import Offers from "./Components/Offers";
import Help from "./Components/Help";
import ErrorPage from "./Components/ErrorPage";
import useCurrentLocation from "./Components/UseCurrentLocation";

function App() {

  useCurrentLocation()

  const isVisibile = useSelector((state) => state.toggleSlice.searchBarToggle )

  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle )

  return (

          <div
            className={` ${isVisibile || loginVisible ? "max-h-screen overflow-hidden" : ""}`}
          >

            <Routes>

              <Route path="/" element={<Header />}>

                <Route path="/" element={<HeroSection />} />

                <Route path="/foodInfo/:id" element={<FoodInfo />} />

                <Route path = "/cart" element = {<Cart/>} />

                <Route path = "/my-account" element = {<SigninPage/>} />

                <Route path = "/search" element = {<SearchPage/>} />

                <Route path = "/offers" element = {<Offers/>} />

                <Route path = "/support" element = {<Help/>} />

                <Route path="*" element = {<ErrorPage />} />

              </Route>

            </Routes>

          </div>

  );
}

export default App;
