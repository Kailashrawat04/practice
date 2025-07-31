import React from "react";
import { FaHome, FaSearch, FaPlusSquare, FaShoppingCart, FaUser } from "react-icons/fa";
import "./BottomNav.css";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <a href="/" className="nav-item">
        <FaHome />
        <span>Home</span>
      </a>
      <a href="/search" className="nav-item">
        <FaSearch />
        <span>Search</span>
      </a>
      <a href="/new" className="nav-item">
        <FaPlusSquare />
        <span>New</span>
      </a>
      <a href="/cart" className="nav-item">
        <FaShoppingCart />
        <span>Cart</span>
      </a>
      <a href="/profile" className="nav-item">
        <FaUser />
        <span>Profile</span>
      </a>
    </nav>
  );
};

export default BottomNav;
