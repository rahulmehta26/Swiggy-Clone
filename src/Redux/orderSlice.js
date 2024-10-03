import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    orders: JSON.parse(localStorage.getItem("placedOrderData")) || [],
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders = [...state.orders, action.payload ];

      localStorage.setItem("placedOrderData", JSON.stringify(state.orders) )
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;