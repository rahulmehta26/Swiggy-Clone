import { createSlice } from "@reduxjs/toolkit";

let addAddressInfo = [];

const addressFromLocalStorage = localStorage.getItem("address");
if (addressFromLocalStorage) {
  try {
    addAddressInfo = JSON.parse(addressFromLocalStorage);
  } catch (error) {
    console.error("Error parsing address from localStorage:", error);
  }
}

const addressSlice = createSlice({
  name: "addressSlice",
  initialState: {
    addresses: addAddressInfo
  },
  reducers: {
    setAddress: (state, action) =>{
      const addressString = localStorage.getItem('address');
    
      if (addressString) {
        try {
          const address = JSON.parse(addressString);
          state.addresses = [...address, action.payload];
          localStorage.setItem("address", JSON.stringify([...address, action.payload]));
        } catch (error) {
          console.error('Error parsing address from localStorage:', error);
        }
      } 
    },

    removeAddress: (state, action) => {
      state.addresses = action.payload;
      localStorage.setItem("address", JSON.stringify(action.payload));
    },
  },
});

export const { setAddress, removeAddress } = addressSlice.actions;
export default addressSlice.reducer;
