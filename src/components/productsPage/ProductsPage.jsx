import Product from "../product/Product";
import NoResult from "../errors/NoResult";
import "./productsPage.css";
import PageTransition from "../PageTransition";
function ProductsPage({ title, products }) {
  return (
    <PageTransition>
      <div className="container">
        <div className="products-header">
          <h2>{title || "Products"}</h2>
        </div>
        {!products?.length ? (
          <NoResult />
        ) : (
          <div className="products">
            {products.map((product) => (
              <Product {...product} key={product._id} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default ProductsPage;
