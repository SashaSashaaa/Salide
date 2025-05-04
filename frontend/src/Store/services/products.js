import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/products/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => `products/${params ? "?" + params: ""}`,
    }),
    getCategories: builder.query({
      query: () => `categories/`,
    }),
    getOneProduct: builder.query({
      query: (id) => `products/${id}/`,
    })
  }),
})

export const { useGetProductsQuery, useGetCategoriesQuery, useGetOneProductQuery } = productApi