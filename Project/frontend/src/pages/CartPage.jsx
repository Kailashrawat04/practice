import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cart");
      // Defensive check for data structure
      if (res.data && Array.isArray(res.data.cartItems)) {
        setCartItems(res.data.cartItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  // Increase quantity of a cart item
  const increaseQuantity = async (itemId) => {
    try {
      await axios.put(`http://localhost:3000/cart/increase/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // Decrease quantity of a cart item
  const decreaseQuantity = async (itemId) => {
    try {
      await axios.put(`http://localhost:3000/cart/decrease/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  // Navigate to checkout page
  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      <Navbar />
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ maxWidth: "800px", margin: "auto" }}>
          {cartItems.map((item) => {
            // Defensive check for product data
            const product = item.productId || {};
            return (
              <div
                key={item._id}
                onClick={() => navigate(`/products/${product._id}`)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  margin: "10px 0",
                  padding: "10px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer"
                }}
              >
                <img
                  src={product.image || ""}
                  alt={product.title || "Product Image"}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", marginRight: "20px" }}
                />
                <div style={{ flex: 1 }}>
                  <h3>{product.title || "No Title"}</h3>
                  <p>Price: {product.price || "N/A"}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div>
                    <button onClick={(e) => { e.stopPropagation(); increaseQuantity(item._id); }} style={{ marginRight: "10px" }}>
                      +
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); decreaseQuantity(item._id); }}>-</button>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={goToCheckout} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

// This component fetches cart items from backend, allows quantity adjustments, and navigates to checkout.
