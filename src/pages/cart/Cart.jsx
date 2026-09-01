import "./cart.css";
import {
  useGetMyCartQuery,
  useUpdateCartItemQuantityMutation,
  useClearCartMutation,
  useDeleteCartItemMutation,
} from "../../api/cartApi";
import { FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoResult from "../../components/errors/NoResult";
import Authentication from "../../components/errors/Authentication";
import CartLoading from "./CartLoading";
import PageTransition from "../../components/PageTransition";
import { handleApiError } from "../../utils/handleApiError";
import { handleApiSuccess } from "../../utils/handleApiSuccess";
function Cart() {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetMyCartQuery(undefined, {
    skip: !isAuth,
  });
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const [clearCart] = useClearCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  if (isLoading) {
    return <CartLoading />;
  }
  if (!isAuth) {
    return <Authentication />;
  }
  if (error) {
    handleApiError(error);
    return <NoResult />;
  }
  let cart = data || null;
  let cartItems = cart?.data?.cartItems ?? [];
  if (!isLoading && !cartItems?.length) return <NoResult />;
  // Event handlers

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItemQuantity({
        id: itemId,
        quantity: newQuantity,
      }).unwrap();
      handleApiSuccess("Quantity updated successfully");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDeleteCartItem = async (itemId) => {
    try {
      await deleteCartItem({ id: itemId }).unwrap();
      handleApiSuccess("Item deleted successfully");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
      handleApiSuccess("Cart cleared successfully");
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <PageTransition>
      <div className="checkout">
        <div className="ordersummary">
          <div className="head">
            <h1>Cart</h1>
            <button className="btn" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
          <div className="items">
            {cartItems.length === 0 ? (
              <p className="message">Your Cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div className="item_cart" key={item.product._id}>
                  <div className="image_name">
                    <div className="img_item">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                      />
                    </div>

                    <div className="content">
                      <h4>{item.product.title}</h4>
                      <p className="price_item">${item.product.price}</p>

                      <div className="quantity_control">
                        <button
                          onClick={() => {
                            handleUpdateQuantity(
                              item.product._id,
                              item.quantity - 1,
                            );
                          }}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          onClick={() => {
                            handleUpdateQuantity(
                              item.product._id,
                              item.quantity + 1,
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="delete_item"
                    onClick={() => {
                      handleDeleteCartItem(item.product._id);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="bottom_summary">
            <div className="shop_table">
              <p>Total:</p>
              <span className="total_checkout">
                $ {cart?.data?.totalCartPrice ?? 0}
              </span>
            </div>

            <div className="button_div">
              <button type="submit" onClick={() => navigate("/checkout")}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Cart;
