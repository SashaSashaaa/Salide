import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getCSRF from '../../Controllers/getSCRF'
import { useNavigate } from 'react-router'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (params) => `user/`,
      providesTags:["User"],
    }),

    login: builder.mutation({
      query(body) {
        return {
          url: `login/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'User'}],
    }),

    register: builder.mutation({
      query(body) {
        return {
          url: `register/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'User'}],
    }),

    logout: builder.mutation({
      query() {
        return {
          url: `logout/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: 'POST',
          body: {},
        }
      },
      invalidatesTags: [{ type: 'User'}],
    }),
  }),
})

export const { useGetUserQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = userApi