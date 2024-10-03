import { createSlice } from "@reduxjs/toolkit";


const geoCodeSlice = createSlice({

    name:'GeoCode',
    initialState:{
        lat:"15.1393932",
        lng:'76.9214428'

    },

    reducers:{

        setGeoCode: (state, action) => {

            state.lat = action.payload.lat,
            state.lng = action.payload.lng
        }
    }
})

export const {setGeoCode} = geoCodeSlice.actions
export default geoCodeSlice.reducer