import { createListenerMiddleware } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setCredentials, logout } from "../../features/auth/authSlice";
import { authApi } from "../../api/authApi";
import { cartApi } from "../../api/cartApi";
import { productsApi } from "../../api/productApi";
import { wishlistApi } from "../../api/wishlistApi";
import { usersApi } from "../../api/usersApi";
export const authListeners = createListenerMiddleware();
authListeners.startListening({
  actionCreator: setCredentials,
  effect: (action) => {
    const { token } = action.payload;
    if (token) {
      Cookies.set("token", token, { expires: 7, secure: true });
    }
  },
});

authListeners.startListening({
  actionCreator: logout,
  effect: (action, listenerApi) => {
    Cookies.remove("token");
    listenerApi.dispatch(authApi.util.resetApiState());
    listenerApi.dispatch(cartApi.util.resetApiState());
    listenerApi.dispatch(wishlistApi.util.resetApiState());
    listenerApi.dispatch(productsApi.util.resetApiState());
    listenerApi.dispatch(usersApi.util.resetApiState());
  },
});
