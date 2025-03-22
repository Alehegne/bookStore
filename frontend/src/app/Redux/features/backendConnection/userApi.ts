import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface AdminResponse{
    message:string;
    token?:string;
   
}



export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api/users"}),
    tagTypes:["User"],
    endpoints:(build)=>({
        postAdmin:build.mutation<AdminResponse,{userName:string,password:string}>({
            query:({userName,password})=>({
                url:"admin",
                method:"POST",
                body:{
                    userName,
                    password
                },
                headers:{
                    "Content-Type":"application/json"
                }
            }),
            invalidatesTags:["User"],

        })
    })
})

export const {usePostAdminMutation} = userApi;
