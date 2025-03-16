"use client"
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cart/cartSlice"
import favoriteReducer from "../features/favorite/favoriteSlice";
import { bookApi } from '../features/backendConnection/bookApi';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    favorite:favoriteReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
  // middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
  //   serializableCheck:false
  // })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch