import React from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "./images/cart-icon.webp";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="header">
      <span>
        <img src="https://www.shutterstock.com/image-vector/logo-vector-shoes-store-600w-2358383733.jpg" className="logo" alt="logo" />
      </span>
      <span className="brand-name">SneakerVerse</span>
      <span className="right-section">
        <img src={cartIcon} alt="Shopping Cart" className="cart-icon" />
        <button 
          className="signup-btn"
          onClick={() => {
            navigate("/Signup");
          }}
        >
          Sign Up
        </button>
        <button 
          className="login-btn"
          onClick={() => {
            navigate("/Login");
          }}
        >
          Login
        </button>
      </span>
    </div>
  );
};

export default Navbar;
