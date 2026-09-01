import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../api/orderApi";
import Authentication from "../../components/errors/Authentication";
import NoResult from "../../components/errors/NoResult";
import { useNavigate } from "react-router-dom";
import "./order.css";
import OrdersLoading from "./OrdersLoading";
import PageTransition from "../../components/PageTransition";
function Orders() {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { data: orderData, isLoading } = useGetMyOrdersQuery(
    { sort: "-createdAt" },
    {
      skip: !isAuth,
    },
  );
  if (isLoading) {
    return <OrdersLoading />;
  }
  const orders = orderData?.data;
  if (!isAuth) return <Authentication />;
  if (!isLoading && !orders?.length) return <NoResult />;
  return (
    <>
      <PageTransition>
        <div className="container orders-container">
          <h1>Orders</h1>
          <div className="orders">
            {orders.map((order) => {
              return (
                <div
                  className="order-cart"
                  onClick={() => {
                    navigate(`/orders/${order._id}`);
                  }}
                  key={order._id}
                >
                  <img src={order?.cartItems[0]?.product?.imageCover} alt="" />
                  <div className="info">
                    <p className="createdAt">
                      Created At: {order.createdAt.split("T")[0]} ||{" "}
                      {order?.createdAt?.split("T")[1]?.split(".")[0]}
                    </p>
                    <p className="orderId">OrderId: {order?._id}</p>
                    <h3>
                      {order?.cartItems[0]?.product?.title}{" "}
                      {order?.cartItems.length > 1 ? (
                        <span className="more">
                          {order?.cartItems.length - 1} more
                        </span>
                      ) : (
                        ""
                      )}
                    </h3>
                    <div className="details">
                      <span>{order?.cartItems.length} items</span>
                      <span className="total">
                        Total: ${order?.totalOrderPrice}
                      </span>
                    </div>
                  </div>
                  <span className="status">{order?.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </PageTransition>
    </>
  );
}

export default Orders;
