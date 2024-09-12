import { createSlice } from "@reduxjs/toolkit";




const toggleSlice = createSlice({

    name : "toggleSlice",
    initialState: {
       searchBarToggle : false
    },

    reducers : {

        searchBarToggleReducer : (state, action) => {
            
            state.searchBarToggle = !state.searchBarToggle

        }

    }
})

export const { searchBarToggleReducer } = toggleSlice.actions

export default toggleSlice.reducer