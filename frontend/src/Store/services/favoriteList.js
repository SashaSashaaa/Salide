import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getCSRF from '../../Controllers/getSCRF'
import { useNavigate } from 'react-router'

export const favoriteApi = createApi({
  reducerPath: 'favoriteApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getFavorite: builder.query({
      query: (params) => `favorites/`,
      providesTags:["Favorite"],
    }),

    setFavorite: builder.mutation({
      query(body) {
        return {
          url: `favorites/add/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Favorite'}],
    }),
    removeFavorite: builder.mutation({
      query(body) {
        // console.log(body)
        return {
          url: `favorites/remove/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Favorite'}],
    }),
  }),
})

export const { useGetFavoriteQuery, useSetFavoriteMutation, useRemoveFavoriteMutation } = favoriteApi