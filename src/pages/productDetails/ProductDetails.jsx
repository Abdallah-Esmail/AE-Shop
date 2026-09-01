import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineStarHalf } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";
import { FaHeart, FaShare } from "react-icons/fa";
import { useGetProductQuery } from "../../api/productApi";
import { useAddToMyCartMutation } from "../../api/cartApi";
import {
  useGetMyWishlistQuery,
  useAddToMyWishlistMutation,
  useRemoveFromMyWishlistMutation,
} from "../../api/wishlistApi";
import "./productDetails.css";
import { TiShoppingCart } from "react-icons/ti";
import ProductsSlider from "../../components/productsSlider/ProductsSlider";
import ProductDetailsLoading from "./ProductDetailsLoading";
import ProductsSliderLoading from "../../components/productsSlider/ProductsSliderLoading";
import NoResult from "../../components/errors/NoResult";
import PageTransition from "../../components/PageTransition";
import { handleApiSuccess } from "../../utils/handleApiSuccess";
import { handleApiError } from "../../utils/handleApiError";
import Spinner from "../../components/spinner/Spinner";
function ProductDetails() {
  const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState(null);

  const { data, isLoading, isFetching, isError } = useGetProductQuery(id, {
    skip: !id,
  });
  const { data: wishlist } = useGetMyWishlistQuery();
  const [addToCart, { isLoading: isCartLoading }] = useAddToMyCartMutation();
  const [addToWishlist, { isLoading: addToWishlistLoading }] =
    useAddToMyWishlistMutation();
  const [removeFromMyWishlist, { isLoading: removeFromWishlistLoading }] =
    useRemoveFromMyWishlistMutation();

  const inWishlistItems = (id) => {
    return wishlist?.data?.wishlistItems?.some((item) => item._id === id);
  };

  // Event handlers
  const handleAddToCart = async () => {
    try {
      await addToCart({ itemId: id }).unwrap();
    } catch (err) {
      handleApiError(err);
    }
  };
  const handleToggleToWishlist = async (id) => {
    if (inWishlistItems(id)) {
      try {
        await removeFromMyWishlist(id).unwrap();
      } catch (err) {
        handleApiError(err);
      }
    } else {
      try {
        await addToWishlist({ productId: id }).unwrap();
      } catch (err) {
        handleApiError(err);
      }
    }
  };

  const product = data?.data;
  if (isLoading || isFetching)
    return (
      <>
        <ProductDetailsLoading /> <ProductsSliderLoading />
      </>
    );
  if (!product || isError) return <NoResult />;

  const handleShare = async () => {
    const productUrl = `${window.location.origin}/products/${product._id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.title, url: productUrl });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(productUrl);
        handleApiSuccess("Product link copied to clipboard!");
      } catch (err) {
        handleApiError(err);
      }
    }
  };

  return (
    <PageTransition key={id}>
      <div>
        <div className="item-details">
          <div className="container">
            <div className="item-imgs">
              <div className="big-img">
                <img
                  src={selectedImg ?? product.imageCover}
                  alt={product.title}
                />
              </div>
              <div className="small-img">
                <img
                  src={product.imageCover}
                  alt={`${product.title} 0`}
                  onClick={() => {
                    setSelectedImg(product.imageCover);
                  }}
                />
                {product.images?.map((img, index) => {
                  return (
                    <img
                      key={index + 1}
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      onClick={() => {
                        setSelectedImg(img);
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="details">
              <h1 className="name">{product.title}</h1>
              <div className="stars">
                {Array.from({ length: Math.ceil(product.ratingsAverage) }).map(
                  (_, index) => (
                    <RiStarSFill key={index} />
                  ),
                )}
                {product.ratingsAverage % 1 ? <MdOutlineStarHalf /> : ""}
              </div>
              <p className="price">$ {product.price}</p>
              <h5 className="availability">
                Availability:{" "}
                <span>{product.quantity > 0 ? "In Stock" : "Sold Out"}</span>
              </h5>
              <h5>
                Brand:{" "}
                <span>{product.brand?.name || product.brand || "N/A"}</span>
              </h5>
              <p className="description">{product.description}</p>
              {product.quantity > 0 && product.quantity <= 10 ? (
                <h5 className="quantity">
                  <span>
                    Hurry Up! {product.quantity} products left in stock.
                  </span>
                </h5>
              ) : (
                ""
              )}
              <button className="btn" onClick={handleAddToCart}>
                Add to cart
                {isCartLoading ? <p>Loading...</p> : <TiShoppingCart />}
              </button>
              <div className="icons">
                <span
                  className={inWishlistItems(product?._id) ? "active" : ""}
                  onClick={() => handleToggleToWishlist(product._id)}
                >
                  {addToWishlistLoading || removeFromWishlistLoading ? (
                    <Spinner size={30} />
                  ) : (
                    <FaHeart />
                  )}
                </span>
                <span>
                  <FaShare onClick={handleShare} />
                </span>
              </div>
            </div>
          </div>
        </div>
        {product?.category ? (
          <ProductsSlider category={product?.category} currentProductId={id} />
        ) : (
          ""
        )}
      </div>
    </PageTransition>
  );
}

export default ProductDetails;
