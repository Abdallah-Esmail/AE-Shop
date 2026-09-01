import { useSelector } from "react-redux";
import {
  useLazyCheckoutSessionQuery,
  useCreateCashOrderMutation,
  useGetMyCartQuery,
} from "../../api/cartApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import Authentication from "../../components/errors/Authentication";
import CheckoutLoading from "./CheckoutLoading";
import PageTransition from "../../components/PageTransition";
import { handleApiError } from "../../utils/handleApiError";
import NoResult from "../../components/errors/NoResult";
import Spinner from "../../components/spinner/Spinner";
function Checkout() {
  const governorates = [
    "Cairo",
    "Giza",
    "Alexandria",
    "Qalyubia",
    "Port Said",
    "Suez",
    "Damietta",
    "Dakahlia",
    "Sharqia",
    "Gharbia",
    "Monufia",
    "Beheira",
    "Kafr El Sheikh",
    "Fayoum",
    "Beni Suef",
    "Minya",
    "Assiut",
    "Sohag",
    "Qena",
    "Luxor",
    "Aswan",
    "Red Sea",
    "New Valley",
    "Matrouh",
    "North Sinai",
    "South Sinai",
  ];
  const [shippingData, setShippingData] = useState({
    phone: "",
    city: "",
    details: "",
  });
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const {
    data: cart,
    isLoading,
    error,
  } = useGetMyCartQuery(undefined, {
    skip: !isAuth,
  });
  const [triggerCheckout, { isCheckoutLoading }] =
    useLazyCheckoutSessionQuery();
  const [createCashOrder, { isCashOrderLoading }] =
    useCreateCashOrderMutation();
  if (!isAuth) {
    return <Authentication />;
  }
  if (isLoading) {
    return <CheckoutLoading />;
  }
  if (error) {
    handleApiError(error);
    return <NoResult />;
  }

  // Event handlers

  const handleGoToBillingSubmit = async (e) => {
    e.preventDefault();
    const cartId = cart?.data?._id;
    if (!cartId) return;

    try {
      const res = await triggerCheckout({
        cartId,
        shippingAddress: shippingData,
      }).unwrap();
      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleCreateCashOrderSubmit = async (e) => {
    e.preventDefault();
    const cartId = cart?.data?._id;
    if (!cartId) return;

    try {
      await createCashOrder({ cartId, shippingAddress: shippingData }).unwrap();
      navigate("/orders");
    } catch (err) {
      handleApiError(err);
    }
  };
  return (
    <PageTransition>
      <div className="container">
        <h1 className="head">Checkout</h1>
        <div className="order-container">
          <div className="cart-products">
            {cart?.data?.cartItems?.map((item) => {
              return (
                <div className="cart-product" key={item.product._id}>
                  <img src={item.product.imageCover} alt="Product image" />
                  <div className="info">
                    <h3>{item?.product?.title}</h3>
                    <span>{item?.price}</span> <span>({item?.quantity})</span>
                  </div>
                </div>
              );
            })}
          </div>
          <form action="">
            <label htmlFor="phone">Phone Number: </label>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={(e) =>
                setShippingData({ ...shippingData, phone: e.target.value })
              }
            />
            <label htmlFor="city">City: </label>
            <select
              name="city"
              id="city"
              defaultValue=""
              onChange={(e) =>
                setShippingData({ ...shippingData, city: e.target.value })
              }
            >
              <option value="" disabled>
                Choose Governorate
              </option>

              {governorates.map((governorate) => (
                <option key={governorate} value={governorate}>
                  {governorate}
                </option>
              ))}
            </select>
            <label htmlFor="datails">Detailed Address: </label>
            <input
              type="text"
              name="details"
              id="details"
              onChange={(e) =>
                setShippingData({ ...shippingData, details: e.target.value })
              }
            />
            <h3>Total: {<span>$ {cart?.data?.totalCartPrice}</span>}</h3>
            <button
              type="button"
              disabled={isCheckoutLoading}
              onClick={handleGoToBillingSubmit}
              className="billing-btn"
            >
              {isCheckoutLoading ? <Spinner size={20} /> : "Go To Billing"}
            </button>

            <button
              type="button"
              disabled={isCashOrderLoading}
              onClick={handleCreateCashOrderSubmit}
              className="billing-btn"
            >
              {isCashOrderLoading ? <Spinner size={20} /> : "Cash Order"}
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default Checkout;
