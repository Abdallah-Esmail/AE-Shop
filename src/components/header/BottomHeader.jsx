import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavCategories from "./NavCategories";

import { logout } from "../../features/auth/authSlice";

import { useDispatch, useSelector } from "react-redux";

// Icons
import { IoMenu } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { useGetCategoriesQuery } from "../../api/categoriesApi";
import { handleApiSuccess } from "../../utils/handleApiSuccess";

const navLinks = [
  { key: 0, title: "Home", link: "/" },
  { key: 1, title: "Accessories", link: "/categories/accessories" },
  { key: 2, title: "About", link: "/about" },
  { key: 3, title: "Contact", link: "/contact" },
];

export default function BottomHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const [openCategories, setOpenCategories] = useState(false);
  const location = useLocation();
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.data;
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location]);

  return (
    <div className="bottom-header">
      <div className="container">
        <nav>
          <div className="category-map" ref={dropdownRef}>
            <div
              className="category-button"
              onClick={() => {
                setOpenCategories(!openCategories);
              }}
            >
              <IoMenu />
              <p>Browse Category</p>
              <IoMdArrowDropdown />
            </div>
            <ul
              className={`category-nav-list ${openCategories ? "active" : ""}`}
            >
              {isLoading ? (
                <NavCategories />
              ) : (
                categories.map((category) => (
                  <li key={category?._id}>
                    <Link
                      to={`/categories/${category?.slug}`}
                      onClick={() => setOpenCategories(false)}
                    >
                      {" "}
                      {category?.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li
                key={link.key}
                className={location.pathname === link.link ? "active" : ""}
              >
                <Link to={link.link}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-icons">
          {isAuth ? (
            <FaSignOutAlt
              onClick={() => {
                navigate("/", { replace: true });
                dispatch(logout());
                handleApiSuccess("Logged out successfully");
              }}
            />
          ) : (
            <>
              <Link to={"/signup"}>
                <FaUserPlus />
              </Link>
              <Link to={"/login"}>
                <FaSignInAlt />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
