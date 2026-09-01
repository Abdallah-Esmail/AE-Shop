import { createListenerMiddleware } from "@reduxjs/toolkit";
import { orderApi } from "../../api/orderApi";
import { cartApi } from "../../api/cartApi";
export const orderListeners = createListenerMiddleware();

orderListeners.startListening({
  matcher: cartApi.endpoints.createCashOrder.matchFulfilled,
  effect: (action, listenerApi) => {
    listenerApi.dispatch(orderApi.util.resetApiState());
  },
});
