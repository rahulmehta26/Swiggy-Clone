/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({

    name : "toggleSlice",
    initialState: {
       searchBarToggle : false,
       loginToggle: false,
       similarResDish:{
        sameResDishToggle:false,
        city:'',
        resId:'',
        itemId:'',
        resLocation:''
       },
       isSameResToggle:false,
    },

    reducers : {

        searchBarToggleReducer : (state, action) => {
            
            state.searchBarToggle = !state.searchBarToggle

        },

        loginToggleReducer : (state, action) => {
            
            state.loginToggle = !state.loginToggle

        },

        sameResDishToggleReducer : (state, action) => {
            
            state.similarResDish.sameResDishToggle = !state.similarResDish.sameResDishToggle

        },

        isSameResToggleReducer : (state, action) => {
            
            state.isSameResToggle = !state.isSameResToggle

        },

        setSimilarResDish : (state, action) => {
            
            state.similarResDish = action.payload

        },

        resetSimilarResDish : (state, action) => {

            state.similarResDish = {

                sameResDishToggle:false,
                city:'',
                resId:'',
                itemId:'',
                resLocation:''
            }
        },

    }
})

export const { searchBarToggleReducer, loginToggleReducer, resetSimilarResDish ,setSimilarResDish ,sameResDishToggleReducer, isSameResToggleReducer } = toggleSlice.actions

export default toggleSlice.reducer