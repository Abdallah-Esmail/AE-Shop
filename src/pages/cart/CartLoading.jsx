import PageTransition from "../../components/PageTransition";

function CartLoading() {
  return (
    <PageTransition>
      <div className="cart-loading">
        <div className="checkout">
          <div className="ordersummary">
            <div className="head">
              <h1>Cart</h1>
            </div>
            <div className="items">
              <div className="item_cart">
                <div className="content skeltion"></div>
              </div>
              <div className="item_cart">
                <div className="content skeltion"></div>
              </div>
            </div>

            <div className="bottom_summary">
              <div className="shop_table skeltion"></div>
            </div>

            <div className="button_div skeltion"></div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default CartLoading;
