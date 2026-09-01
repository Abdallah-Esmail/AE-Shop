import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../api/authApi";
import { authListeners } from "../features/middlewares/authListeners";
import { cartApi } from "../api/cartApi";
import { orderApi } from "../api/orderApi";
import { wishlistApi } from "../api/wishlistApi";
import { usersApi } from "../api/usersApi";
import { productsApi } from "../api/productApi";
import { categoriesApi } from "../api/categoriesApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(authListeners.middleware)
      .concat(
        authApi.middleware,
        productsApi.middleware,
        orderApi.middleware,
        cartApi.middleware,
        wishlistApi.middleware,
        categoriesApi.middleware,
        usersApi.middleware,
      ),
});
