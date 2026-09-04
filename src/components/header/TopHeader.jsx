import "./header.css";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
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
import { IoClose } from "react-icons/io5";
import HeaderNav from "./HeaderNav";
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
  const navRef = useRef(null);
  const location = useLocation();
  const toggleNav = () => {
    setNavActive(!navActive);
  };

  // Close on resize above breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setNavActive(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close when clicking outside the nav
  useEffect(() => {
    if (!navActive) return;

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setNavActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navActive]);

  // Close on route change
  useEffect(() => {
    setNavActive(false);
  }, [location.pathname]);

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
      <div ref={navRef} className={`header-nav ${navActive ? "active" : ""}`}>
        <HeaderNav />
      </div>
    </header>
  );
}
