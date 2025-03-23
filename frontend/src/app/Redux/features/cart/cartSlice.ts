import {  serializedBook } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

export interface CartState {
    cartItems: serializedBook[];
}

const initialState: CartState = {
  cartItems: [],

}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action:PayloadAction<serializedBook>)=>{
        // console.log("state cart items",state.cartItems);
        // console.log("action payload",action.payload);
        const existingItem = state.cartItems.find((item)=>{
           return  item._id === action.payload._id
        });
        // console.log("existing item",existingItem);
        // console.log("now action payload",action.payload);
        const itemTitle = action.payload.title;
        
        if(!existingItem){
            state.cartItems.push(
                action.payload
            );
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${itemTitle} added to cart`,
              showConfirmButton: false,
              timer: 1500
            });

        }else{
          Swal.fire({
            title: `${itemTitle} is already in cart`,
            text: "Do you want to increase the quantity?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            confirmButtonColor: "#4caf50",
            cancelButtonColor: "#f44336",

            icon: "info"
          }).then((result)=>{
            if(result.isConfirmed){
              Swal.fire(({
                position: "top-end",
              icon: "success",
              title: `${itemTitle} added to cart`,
              showConfirmButton: false,
              timer: 1500
              }))
            }
          })
        }
    },
    removeFromCart:(state,action:PayloadAction<{id:string | number}>)=>{
      state.cartItems = state.cartItems.filter((item)=>item._id !==action.payload.id)
    },
    clearCart:(state)=>{
      state.cartItems = []
    }
  },
})

// Action creators are generated for each case reducer function

export const {addToCart,removeFromCart,clearCart} = cartSlice.actions
export default cartSlice.reducer