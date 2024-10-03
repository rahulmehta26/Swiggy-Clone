import { createSlice } from "@reduxjs/toolkit";


const filteredSlice = createSlice({
        
    name:'filterData',
    initialState:{
        filterValue : null
    },

    reducers : {
       
        setFilterData : (state, action) => {

            state.filterValue = action.payload

        }
    },

})

export const { setFilterData } = filteredSlice.actions

export default filteredSlice.reducer