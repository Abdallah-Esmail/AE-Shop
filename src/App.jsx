import TopHeader from "./components/header/TopHeader";
import BottomHeader from "./components/header/BottomHeader";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/productDetails/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "./features/auth/authSlice";
import Cart from "./pages/cart/Cart";
import { useGetMeQuery } from "./api/usersApi";
import Wishlist from "./pages/wishlist/wishlist";
import Category from "./pages/cateogry/Category";
import SearchResults from "./pages/searchResults/SearchResults";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import NoPage from "./pages/NoPage/NoPage";
import ForgetPassword from "./pages/auth/ForgetPassword";
import VerifyPasswordResetCode from "./pages/auth/VerifyPasswordResetCode";
import ResetPassword from "./pages/auth/ResetPassword";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const { data, isSuccess } = useGetMeQuery(undefined, {
    skip: !isAuth,
  });
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials(data));
    }
  }, [isSuccess, data]);
  return (
    <>
      <header>
        <TopHeader />
        <BottomHeader />
      </header>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories/:slug" element={<Category />}></Route>
          <Route path="/Checkout" element={<Checkout />}></Route>
          <Route path="/orders/:id" element={<OrderDetails />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/search" element={<SearchResults />}></Route>
          <Route path="/wishlist" element={<Wishlist />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route
            path="/verify-password-reset-code"
            element={<VerifyPasswordResetCode />}
          ></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </AnimatePresence>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
