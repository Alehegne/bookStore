"use client"
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cart/cartSlice"
import favoriteReducer from "../features/favorite/favoriteSlice";
import { bookApi } from '../features/backendConnection/bookApi';
import { orderApi } from '../features/backendConnection/orderApi';
import { loadCartFromLocalStorage, saveCartToLocalStorage } from '@/lib/utils';
import { userApi } from '../features/backendConnection/userApi';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    favorite:favoriteReducer,
    
  },
  preloadedState:{//to load the cart from local storage, before the app renders
    cart:loadCartFromLocalStorage()
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware,orderApi.middleware,userApi.middleware),
  // middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
  //   serializableCheck:false
  // })
})

store.subscribe(()=>{//set state to local storage,whenever the state changes
  console.log("state changed");
  console.log("state",store.getState());
  saveCartToLocalStorage({cartItems:store.getState().cart.cartItems});
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch