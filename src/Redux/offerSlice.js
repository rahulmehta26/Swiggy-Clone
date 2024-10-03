import { createSlice } from "@reduxjs/toolkit";


const offerSlice = createSlice({

    name:'OfferSlice',
    initialState:{
        offerData : [],
    },

    
    reducers:{
        
        setOfferData: (state, action) => {
            state.offerData = action.payload
        }
    }
    
})

export const {setOfferData} = offerSlice.actions
export default offerSlice.reducer