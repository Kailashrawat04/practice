import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecommendedProducts.css";

const RecommendedProducts = ({ currentProductId }) => {
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommended();
  }, [currentProductId]);

  const fetchRecommended = async () => {
    try {
      // Fetch recommended products from backend, excluding current product
      const res = await axios.get("http://localhost:3000/products/recommended", {
        params: { excludeId: currentProductId }
      });
      setRecommended(res.data);
    } catch (error) {
      console.error("Error fetching recommended products:", error);
      setRecommended([]);
    }
  };

  if (recommended.length === 0) {
    return null;
  }

  return (
    <div className="recommended-container">
      <h3>Recommended Products</h3>
      <div className="recommended-list">
        {recommended.map((product) => (
          <div
            key={product._id}
            className="recommended-card"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
