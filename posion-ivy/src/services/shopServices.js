import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../databases/realTimeDataBase'


export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ["profileImageGet", "locationGet"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const responseTransormed = Object.values(response)
                return responseTransormed
            }
        }),
        getProductsById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const responseTransormed = Object.values(response)
                if (responseTransormed.length) return responseTransormed[0]
                return null
            },
        }),
        postOrder: builder.mutation({
            query: ({ ...order }) => ({
                url: 'orders.json',
                method: 'POST',
                body: order
            }),
        }),
        getOrders: builder.query({
            query: () => `orders.json`,
        }),
        updateStock: builder.mutation({
            query: ({ ...order }) => ({
                url: 'products.json',
                method: 'PATCH',
                body: order
            }),
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ["profileImageGet"],
        }),
        postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image,
                },
            }),
            invalidatesTags: ["profileImageGet"],
        }),
        getLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
            providesTags: ["locationGet"],
        }),
        postLocation: builder.mutation({
            query: ({ location, localId }) => ({
                url: `locations/${localId}.json`,
                method: "PUT",
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    updatedAt: location.updatedAt
                },
            }),
            invalidatesTags: ["locationGet"],
        }),
    }),
});


export const {
    useGetCategoriesQuery, 
    useGetProductsByCategoryQuery, 
    useGetProductsByIdQuery,
    usePostOrderMutation,
    useGetOrdersQuery,
    useUpdateStockMutation, 
    useGetProfileImageQuery,
    usePostProfileImageMutation, 
    useGetLocationQuery,
    usePostLocationMutation
} = shopApi