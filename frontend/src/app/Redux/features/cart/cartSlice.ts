import { book } from '@/types/dummytypes';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'

export interface CartState {
    cartItems: book[];

}

const initialState: CartState = {
  cartItems: [],

}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action:PayloadAction<book>)=>{

        const existingItem = state.cartItems.find((item)=>{
           return  item.id === action.payload.id
        });
        console.log("existing item",existingItem);
        const itemTitle = action.payload.title;
        if(!existingItem){
            state.cartItems.push(action.payload);
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
      state.cartItems = state.cartItems.filter((item)=>item.id !==action.payload.id)
    },
    clearCart:(state)=>{
      state.cartItems = []
    }
  },
})

// Action creators are generated for each case reducer function

export const {addToCart,removeFromCart,clearCart} = cartSlice.actions
export default cartSlice.reducer