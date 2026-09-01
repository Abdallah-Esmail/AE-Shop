import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../api/orderApi";
import "./orderDetails.css";
import OrderDetailsLoading from "./OrderDetailsLoading";
import PageTransition from "../../components/PageTransition";
function OrderDetails() {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderQuery(id);
  if (isLoading) return <OrderDetailsLoading />;
  return (
    <PageTransition>
      <div className="container">
        <h1 className="head">Order Details</h1>
        <div className="order-details-container">
          <div className="order-products">
            {order?.data?.cartItems?.map((item) => {
              return (
                <div className="order-product" key={item.product._id}>
                  <img src={item.product.imageCover} alt="Product image" />
                  <div className="info">
                    <h3>{item?.product?.title}</h3>
                    <span>{item?.price}</span> <span>({item?.quantity})</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-details">
            <p>
              <span>Created At:</span> {order?.data?.createdAt?.split("T")[0]}{" "}
              || {order?.data?.createdAt?.split("T")[1]?.split(".")[0]}
            </p>
            <p>
              <span>OrderId:</span> {order?.data?._id}
            </p>
            <p>
              <span>Payment Method:</span> {order?.data?.paymentMethodType}
            </p>
            {order?.data?.deliveredAt ? (
              <p>
                <span>Delivered At:</span>{" "}
                {order?.data?.deliveredAt?.split("T")[0]} ||{" "}
                {order?.data?.deliveredAt?.split("T")[1]?.split(".")[0]}
              </p>
            ) : (
              ""
            )}
            <p>
              <span>City:</span> {order?.data?.shippingAddress.city}
            </p>
            <p>
              <span>Detailed Address:</span>{" "}
              {order?.data?.shippingAddress.details}
            </p>
            <p>
              <span>Refunded:</span>{" "}
              {order?.data?.isRefunded ? "true" : "false"}
            </p>
            <p>
              <span>Shipping Price:</span> $ {order?.data?.shippingPrice}
            </p>
            <p>
              <span>Tax Price:</span> $ {order?.data?.taxPrice}
            </p>
            <p className="total">
              <span>Total Order Price:</span> $ {order?.data?.totalOrderPrice}
            </p>

            <span className="status">{order?.data?.status}</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default OrderDetails;
