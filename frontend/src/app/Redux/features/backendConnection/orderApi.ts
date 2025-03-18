import { Order } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api/orders",credentials:"include"}),
    tagTypes:["Order"],
    
    endpoints:(build)=>({
        getOrders:build.query<Order[],void>({
            query:()=>``,
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
    useGetOrdersQuery,
    usePostOrdersMutation
} = orderApi;