import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./services/products";
import { userApi } from "./services/user";
import { favoriteApi } from "./services/favoriteList";
import { cartApi } from "./services/cart";
import { orderApi } from "./services/order";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      userApi.middleware,
      favoriteApi.middleware,
      cartApi.middleware,
      orderApi.middleware
    ),
});
