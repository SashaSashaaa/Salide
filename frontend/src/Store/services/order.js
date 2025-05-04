import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getCSRF from "../../Controllers/getSCRF";
import { useNavigate } from "react-router";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params) => `user-orders/`,
      providesTags: ["Orders"],
    }),

    checkout: builder.mutation({
      query() {
        return {
          url: `checkout/`,
          headers: {
            "X-CSRFToken": getCSRF(),
            Accept: "application/json",
          },
          method: "POST",
          body:{},
        };
      },
      invalidatesTags: [{ type: "Orders" }],
    }),
  }),
});

export const {
  useGetOrdersQuery, 
  useCheckoutMutation
} = orderApi;
