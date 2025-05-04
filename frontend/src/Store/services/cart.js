import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getCSRF from "../../Controllers/getSCRF";
import { useNavigate } from "react-router";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (params) => `cart/`,
      providesTags: ["Cart"],
    }),

    addCart: builder.mutation({
      query(body) {
        return {
          url: `cart/add/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Cart" }],
    }),
    removeCart: builder.mutation({
      query(body) {
        return {
          url: `cart/remove/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Cart" }],
    }),
    updateCart: builder.mutation({
      query(body) {
        return {
          url: `cart/update/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Cart" }],
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartQuery,
  useRemoveCartMutation,
  useUpdateCartMutation,
} = cartApi;
