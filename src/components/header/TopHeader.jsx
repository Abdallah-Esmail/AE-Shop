import "./header.css";

import { Link } from "react-router-dom";
import Logo from "/logo.png";
import { useGetMyCartQuery } from "../../api/cartApi";
import { useSelector } from "react-redux";

// React icons
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useGetMyWishlistQuery } from "../../api/wishlistApi";
import { LuInbox } from "react-icons/lu";
import SearchBox from "./SearchBox";
export default function TopHeader() {
  const { isAuth } = useSelector((state) => state.auth);
  const { data: cartData, isLoading: isCartLoading } = useGetMyCartQuery(
    undefined,
    {
      skip: !isAuth,
    },
  );
  const { data: wishlistData, isLoading: isWishlistLoading } =
    useGetMyWishlistQuery();
  const cartCount = isAuth ? (cartData?.data?.cartItems?.length ?? 0) : 0;
  const wishlistCount = isAuth
    ? (wishlistData?.data?.wishlistItems?.length ?? 0)
    : 0;
  return (
    <div className="top-header">
      <div className="container">
        <Link className="logo" to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <SearchBox />
        <div className="header-icons">
          <Link to={"/orders"}>
            <div className="icon">
              <LuInbox />
            </div>
          </Link>
          <Link to={"/wishlist"}>
            <div className="icon">
              <FaRegHeart />
              {isWishlistLoading ? (
                ""
              ) : (
                <span className="count">{wishlistCount}</span>
              )}
            </div>
          </Link>
          <Link to={"/cart"}>
            <div className="icon">
              <TiShoppingCart />
              {isCartLoading ? "" : <span className="count">{cartCount}</span>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
