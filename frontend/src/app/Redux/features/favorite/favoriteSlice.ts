import { book } from "@/types/dummytypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteState{
    favoriteItems:book[]
}

const initialState:FavoriteState = {
    favoriteItems:[]
}

const favoriteSlice = createSlice({
    name:"favorite",
    initialState,
    reducers:{
        addToFavorite:(state,action:PayloadAction<book>)=>{
            const existingItem = state.favoriteItems.find((item)=>item.id === action.payload.id);
            console.log("existing item",existingItem);
            if(!existingItem){
                state.favoriteItems.push(action.payload);
                alert("Item added to favorite");
            }else{
                const index = state.favoriteItems.findIndex((item)=>item.id === action.payload.id);
                state.favoriteItems.splice(index,1);
                alert("Item removed from favorite");
            }
        }
    }

})

export const {addToFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer;
