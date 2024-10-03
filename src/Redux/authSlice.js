import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

    name:'authSlice',
    initialState:{
        userInfo : JSON.parse(localStorage.getItem("userInfo", )) || null
    },

    reducers : {

        addUserInfo : (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        removeUserInfo : (state) => {

            state.userInfo  = null
            localStorage.removeItem("userInfo")
        }

         
    }

})

export const { addUserInfo, removeUserInfo } = authSlice.actions

export default authSlice.reducer