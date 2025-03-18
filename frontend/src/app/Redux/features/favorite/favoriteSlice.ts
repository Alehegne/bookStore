import { serializedBook } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export interface FavoriteState{
    favoriteItems:serializedBook[]
}
const initialState:FavoriteState = {
    favoriteItems:[]
}
const favoriteSlice = createSlice({
    name:"favorite",
    initialState,
    reducers:{
        addToFavorite:(state,action:PayloadAction<serializedBook>)=>{
            const existingItem = state.favoriteItems.find((item)=>item._id === action.payload._id);
            const itemTitle = action.payload.title;
            if(!existingItem){
                state.favoriteItems.push(action.payload);

                  Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: `${itemTitle} added to favorite List`,
                              showConfirmButton: false,
                              timer: 2000,
                              heightAuto: true,
                            });
            }else{
                const index = state.favoriteItems.findIndex((item)=>item._id === action.payload._id);
                state.favoriteItems.splice(index,1);
                Swal.fire({
                    position: "top-end",
                    icon: "warning",
                    title: `${itemTitle} removed from favorite List`,
                    showConfirmButton: false,
                    timer: 2000,
                    heightAuto: true,
                  });
            }
        }
    }

})

export const {addToFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer;
