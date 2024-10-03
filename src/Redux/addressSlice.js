import { createSlice } from '@reduxjs/toolkit';

const addAddressInfo = JSON.parse(localStorage.getItem("address"));

const addressSlice = createSlice({
  name: 'addressSlice',
  initialState: {
    area: addAddressInfo?.area || '' ,
    landmark: addAddressInfo?.landmark || '' ,
    zipCode: addAddressInfo?.zipCode || '',

  },
  reducers: {
    setAddress: (state, action) => {
      state.area = action.payload.area;
      state.landmark = action.payload.landmark;
      state.zipCode = action.payload.zipCode;
      localStorage.setItem("address", JSON.stringify(action.payload));
    },
    removeAddress: (state) => {
      state.area = '';
      state.landmark = '';
      state.zipCode = " ";
      localStorage.removeItem('address');
    },
  },
});

export const { setAddress, removeAddress } = addressSlice.actions;
export default addressSlice.reducer;