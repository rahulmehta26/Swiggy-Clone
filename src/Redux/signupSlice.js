import { createSlice } from "@reduxjs/toolkit";

const savedSignupData = JSON.parse(localStorage.getItem("signupData"));

const initialState = {
  phoneNumber: savedSignupData?.phoneNumber || "",
  name: savedSignupData?.name || "",
  email: savedSignupData?.email || "",
};

const signupSlice = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.name = action.payload.name;
      state.email = action.payload.email;

      localStorage.setItem("signupData", JSON.stringify(action.payload));
    },
    clearSignupData: (state) => {
      state.phoneNumber = "";
      state.name = "";
      state.email = "";

      localStorage.removeItem("signupData");
    },
  },
});

export const { setSignupData, clearSignupData } = signupSlice.actions;

export default signupSlice.reducer;
