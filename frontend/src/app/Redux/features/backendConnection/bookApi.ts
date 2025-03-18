import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { book, Statistics } from '@/types/types';



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

      }),
      getBookById:build.query<book,{id:string}>({
         query:({id})=>`${id}`,
         transformResponse:(response:{book:book})=>response.book,
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         transformErrorResponse:(error:{data?:any,status:number})=>({
          message:error.data?.message || "An error occurred",
          status:error.status,
          error:error.data || "unknown error"
      }),
      providesTags:["Book"]
      }),
      postBook:build.mutation<book,{book:book}>({
          query:({book})=>({
             url:"create",
              method:"POST",
              body:book,
              headers:{
                  "Content-Type":"application/json"
              }
          }),
          invalidatesTags:["Book"],
      }),
      updateBook:build.mutation<book,{book:book}>({
        query:({book})=>({
          url:`update/${book._id}`,
          method:"PUT",
          body:book
        }),
        invalidatesTags:["Book"]
      }),
      deleteBook:build.mutation<{message:string,deletedBook:book},{id:string}>({
        query:({id})=>({
          url:`delete/${id}`,
        }),

        invalidatesTags:["Book"]
      }),
      fetchBookByCategory:build.query<{books:book[],total:number,message:string},{category:string[]}>({
         query:({category})=>`category/${category}`,
         transformResponse:(response:{books:book[],total:number,message:string})=>{
            return {
                books:response.books,
                total:response.total,
                message:response.message
            }
         },
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         transformErrorResponse:(error:{data?:any,status:number})=>({
            message:error.data?.message || "An error occurred",
            status:error.status,
            error:error.data || "unknown error"
         }),
        }),

         topRated:build.query<book[],{limit:number}>({
            query:({limit})=>`topRated/${limit}`,
            transformResponse:(response:{books:book[]})=>response.books,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformErrorResponse:(error:{data?:any,status:number})=>({
                message:error.data?.message || "An error occurred",
                status:error.status,
                error:error.data || "unknown error"
            }),

         }),
         fetchStatistics:build.query<Statistics, void>({
            query:()=>`statistics`,
            transformResponse:(response:Statistics)=>response,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transformErrorResponse:(error:{data?:any,status:number})=>({
                message:error.data?.message || "An error occurred",
                status:error.status,
                error:error.data || "unknown error"
         })
         
      }),
      fetchBooksByAuthor:build.query<book[],{author:string}>({
          query:({author})=>`author?name=${author}`,
          transformResponse:(response:{books:book[]})=>response.books,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          transformErrorResponse:(error:{data?:any,status:number})=>({
              message:error.data?.message || "An error occurred",
              status:error.status,
              error:error.data || "unknown error"
          }),
          providesTags:["Book"]

      })


    })
})

  

 export const {
  useGetBooksQuery,
  useSearchBooksQuery,
  useGetBookByIdQuery,
  usePostBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useFetchBookByCategoryQuery,
  useTopRatedQuery,
  useFetchStatisticsQuery,
  useFetchBooksByAuthorQuery
  } = bookApi

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
  