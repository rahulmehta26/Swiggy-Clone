import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";
import geoCodeSlice from "./geoCodeSlice";
import offerSlice from "./offerSlice";
import signupSlice from "./signupSlice";
import addressSlice from "./addressSlice";
import orderSlice from "./orderSlice";

const store = configureStore({

    reducer : {

        toggleSlice : toggleSlice,
        cartSlice : cartSlice,
        filterSlice:filterSlice,
        authSlice:authSlice,
        geoCodeSlice:geoCodeSlice,
        offerSlice:offerSlice,
        signupSlice:signupSlice,
        addressSlice:addressSlice,
        orderSlice:orderSlice

    }
})

export default store;