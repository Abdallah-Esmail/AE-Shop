import "./checkout.css";
function CheckoutLoading() {
  return (
    <div className="checkout-loading">
      <div className="container">
        <h1 className="head">Checkout</h1>
        <div className="order-container">
          <div className="cart-products">
            <div className="cart-product">
              <div className="image skeltion"></div>
              <div className="info">
                <p className="skeltion"></p>
                <p className="skeltion"></p>
              </div>
            </div>
            <div className="cart-product">
              <div className="image skeltion"></div>
              <div className="info">
                <p className="skeltion"></p>
                <p className="skeltion"></p>
              </div>
            </div>
          </div>
          <form>
            <h3 className="skeltion"></h3>
            <p className="skeltion"></p>
            <h3 className="skeltion" className="skeltion"></h3>
            <p className="skeltion"></p>
            <h3 className="skeltion" className="skeltion"></h3>
            <p className="skeltion"></p>
            <h3 className="skeltion" className="skeltion"></h3>
            <p className="total skeltion"></p>
            <p className="skeltion"></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutLoading;
