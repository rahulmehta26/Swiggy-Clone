/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({

    name : 'cartSlice',
    initialState : {

       cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
       resData: JSON.parse(localStorage.getItem("resData")) || [],
    },

    reducers :{

        addToCart : (state, action) => {

            const {data, resData} = action.payload;

            state.cartItems = [...state.cartItems, data ]

            state.resData = resData
  
            localStorage.setItem("cartData", JSON.stringify(state.cartItems) )
  
            localStorage.setItem("resData", JSON.stringify(resData));
        },
        deleteItem : (state, action) => {

            state.cartItems = action.payload

            localStorage.setItem("cartData", JSON.stringify(action.payload) )

        },
        clearCartItem : (state, action) => {

            state.cartItems = []

            state.resData = []

            localStorage.removeItem("cartData" )
  
            localStorage.removeItem("resData" );
        }

    }

})

export const { addToCart, deleteItem, clearCartItem } = cartSlice.actions

export default cartSlice.reducer;