import { Order } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api/orders",credentials:"include"}),
    tagTypes:["Order"],
    
    endpoints:(build)=>({
        getOrdersByEmail:build.query<Order,{email:string | null | undefined}>({
            query:({email})=>`${email}`,
            providesTags:["Order"]
        }),
        postOrders:build.mutation<Order,{order:Order}>({
            query:({order})=>({
                url:"create",
                method:"POST",
                body:order,
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            }),
            invalidatesTags:["Order"]
            
        })
    })
})

export const {
    useGetOrdersByEmailQuery,
    usePostOrdersMutation
} = orderApi;