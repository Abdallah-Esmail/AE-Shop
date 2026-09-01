import { useGetMyWishlistQuery } from "../../api/wishlistApi";
import ProductsPage from "../../components/productsPage/ProductsPage";
import ProductsPageLoading from "../../components/productsPage/ProductsPageLoading";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NoResult from "../../components/errors/NoResult";
import Authentication from "../../components/errors/Authentication";
import { handleApiError } from "../../utils/handleApiError";
function Wishlist() {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetMyWishlistQuery(undefined, {
    skip: !isAuth,
  });
  useEffect(() => {
    if (!isAuth) {
      <Authentication />;
    }
  }, [isAuth, navigate]);
  if (!isAuth) {
    return null;
  }
  if (isLoading) {
    return <ProductsPageLoading />;
  }
  if (error) {
    handleApiError(error);
    return;
  }
  const wishlist = data?.data?.wishlistItems || [];
  if (!isLoading && !wishlist?.length) return <NoResult />;

  return (
    <div className="wishlist-Page">
      <div className="container">
        {wishlist.length === 0 ? (
          <p>No Favorites Products yet.</p>
        ) : (
          <ProductsPage title="Your Favourite" products={wishlist} />
        )}
      </div>
    </div>
  );
}

export default Wishlist;
