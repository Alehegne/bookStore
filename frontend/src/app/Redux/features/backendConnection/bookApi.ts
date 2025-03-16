import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { book } from '@/types/dummytypes';



export const bookApi = createApi({
    reducerPath: "bookApi",//name of the slice
    baseQuery: fetchBaseQuery({baseUrl: baseQuery()}),
    tagTypes: ["Book"], //
    endpoints: (build) => ({
      getBooks: build.query<book[],{page:number,limit:number}>({
        query: ({page=1,limit=5}) => `?page=${page}&limit=${limit}`,
        transformResponse: (response:{
            books:book[]
        }) => response.books,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transformErrorResponse: (error:{data?:any,status:number}) => (
            {
                message: error.data?.message || "An error occurred",
                status: error.status,
                error:error.data || "unknown error"
            }
        ),
        providesTags: ["Book"],//tags for invalidation
      }),
      searchBooks:build.query<book[],{search:string}>({
        query:({search})=>`search?search=${search}`,
        transformResponse:(response:{books:book[]})=>response.books,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transformErrorResponse:(error:{data?:any,status:number})=>({
            message:error.data?.message || "An error occurred",
            status:error.status,
            error:error.data || "unknown error"
        }),
        providesTags:["Book"]//to invalidate the cache, cuz we are fetching new data

      })

    }),

  })

  export const {useGetBooksQuery} = bookApi;

//   res.status(500).json({message:"Internal server error",error:error}

// getSomething: builder.query<ResponseType, RequestType>({
//     query: (arg) => `endpoint/${arg}`,
//     transformResponse?: (response: ServerResponseType) => ResponseType,
//     transformErrorResponse?: (error: ErrorType) => ErrorType | null,
//     providesTags?: (result, error, arg) => string[],
//     extraOptions?: ExtraOptionsType,  //	{ pollingInterval: 10000 }
//     async onQueryStarted?(arg, { dispatch, queryFulfilled, getState }) {
//       try {
//         const { data } = await queryFulfilled;
//         dispatch(someAction(data)); // Optional optimistic update
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   }),
//   //with mutation
//   export const apiSlice = createApi({
//     reducerPath: "api",
//     baseQuery: fetchBaseQuery({ baseUrl: "https://example.com/api" }),
//     endpoints: (builder) => ({
//       actionName: builder.mutation<ResponseType, RequestPayloadType>({
//         query: (payload) => ({
//           url: "endpoint-url",
//           method: "HTTP_METHOD",
//           body: payload, // Required for POST, PUT, PATCH
//         }),
//         invalidatesTags: ["TagName"], // Optional: Auto-refetch queries
//       }),
//     }),
//   });
  
//   export const { useActionNameMutation } = apiSlice;
  