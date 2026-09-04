// React icons
import { RiStarSFill } from "react-icons/ri";
import { FaCartArrowDown, FaHeart, FaShare } from "react-icons/fa";
import { MdOutlineStarHalf } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAddToMyCartMutation, useGetMyCartQuery } from "../../api/cartApi";
import {
  useAddToMyWishlistMutation,
  useGetMyWishlistQuery,
  useRemoveFromMyWishlistMutation,
} from "../../api/wishlistApi";
import { useSelector } from "react-redux";
import { handleApiError } from "../../utils/handleApiError";
import { handleApiSuccess } from "../../utils/handleApiSuccess";
import Spinner from "../spinner/Spinner";
function Product({ _id, title, quantity, price, imageCover, ratingsAverage }) {
  const { isAuth } = useSelector((state) => state.auth);
  const { data: cart } = useGetMyCartQuery(undefined, { skip: !isAuth });
  const { data: wishlist } = useGetMyWishlistQuery(undefined, {
    skip: !isAuth,
  });
  const [addToCart, { isLoading: addToCartLoading }] = useAddToMyCartMutation();
  const [addToWishlist, { isLoading: addToWishlistLoading }] =
    useAddToMyWishlistMutation();
  const [removeFromMyWishlist, { isLoading: removeFromWishlistLoading }] =
    useRemoveFromMyWishlistMutation();

  const inCartItems = () =>
    cart?.data?.cartItems?.some((item) => item?.product?._id === _id);
  const inWishlistItems = () =>
    wishlist?.data?.wishlistItems?.some((item) => item?._id === _id);

  // Event handlers
  const handleAddToCart = async () => {
    try {
      await addToCart({ itemId: _id }).unwrap();
      handleApiSuccess("Added to cart successfully");
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleToggleToWishlist = async () => {
    if (inWishlistItems()) {
      try {
        await removeFromMyWishlist(_id).unwrap();
        handleApiSuccess("Removed from wishlist successfully");
      } catch (err) {
        handleApiError(err);
      }
    } else {
      try {
        await addToWishlist({ productId: _id }).unwrap();
        handleApiSuccess("Added to wishlist successfully");
      } catch (err) {
        handleApiError(err);
      }
    }
  };
  const handleShare = async () => {
    const productUrl = `${window.location.origin}/products/${_id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: productUrl });
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(productUrl);
      handleApiSuccess("Product link copied to clipboard!");
    }
  };
  return (
    <div className="product">
      <Link to={`/products/${_id}`}>
        <div className="product-img">
          <img src={imageCover} alt={title} />
        </div>
        <p className="product-name">{title}</p>
        <div className="stars">
          {Array.from({ length: Math.floor(ratingsAverage) || 0 }).map(
            (_, index) => (
              <RiStarSFill key={index} />
            ),
          )}
          {ratingsAverage % 1 ? <MdOutlineStarHalf /> : ""}
        </div>
        <div className="foot">
          <p className="price">
            <span>$ {price}</span>
          </p>
          {quantity === 0 ? <span className="stock">Out Of Stock</span> : ""}
          {quantity <= 10 && quantity > 0 ? (
            <span className="stock">Limited Stock</span>
          ) : (
            ""
          )}
        </div>
      </Link>
      <div className="icons">
        <button
          onClick={handleAddToCart}
          className={inCartItems() ? "active" : ""}
          disabled={addToCartLoading}
        >
          {addToCartLoading ? <Spinner size={30} /> : <FaCartArrowDown />}
        </button>
        <button
          onClick={handleToggleToWishlist}
          className={inWishlistItems() ? "active" : ""}
          disabled={addToWishlistLoading || removeFromWishlistLoading}
        >
          {addToWishlistLoading || removeFromWishlistLoading ? (
            <Spinner size={30} />
          ) : (
            <FaHeart />
          )}
        </button>
        <button>
          <FaShare onClick={handleShare} />
        </button>
      </div>
    </div>
  );
}

export default Product;
