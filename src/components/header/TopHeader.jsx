import "./header.css";
import { useState, useEffect } from "react";
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
import { BiMenu } from "react-icons/bi";
import BottomHeader from "./BottomHeader";
import { IoClose } from "react-icons/io5";
export default function TopHeader() {
  const { isAuth } = useSelector((state) => state.auth);
  const { data: cartData, isLoading: isCartLoading } = useGetMyCartQuery(
    undefined,
    {
      skip: !isAuth,
    },
  );
  const { data: wishlistData, isLoading: isWishlistLoading } =
    useGetMyWishlistQuery(undefined, {
      skip: !isAuth,
    });
  const cartCount = isAuth ? (cartData?.data?.cartItems?.length ?? 0) : 0;
  const wishlistCount = isAuth
    ? (wishlistData?.data?.wishlistItems?.length ?? 0)
    : 0;

  // Toggle menu
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  const closeMenu = () => {
    setNavActive(false);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu;
    }
  }, []);
  return (
    <header>
      <div className="top-header">
        <div className="container">
          <Link className="logo" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <SearchBox />
          <div className="header-icons">
            <Link to={"/orders"}>
              <LuInbox />
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
              <TiShoppingCart />
              {isCartLoading ? "" : <span className="count">{cartCount}</span>}
            </Link>
            <a
              className={`menu-icon ${navActive ? "active" : ""}`}
              onClick={toggleNav}
            >
              {navActive ? <IoClose /> : <BiMenu />}
            </a>
          </div>
        </div>
      </div>
      <div className={`header-nav ${navActive ? "active" : ""}`}>
        <BottomHeader />
      </div>
    </header>
  );
}
