import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import SearchBar from "../components/SearchBar";
import PincodeEntry from "../components/PincodeEntry";
import BottomNav from "../components/BottomNav";


const Home = () => {
  const [productData, setProductData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const getData = async (page = 1) => {
    try {
      const res = await axios.get(`http://localhost:3000/products?page=${page}&limit=10`);
      console.log(res.data.products);
      setProductData(res.data.products);
      setPagination(res.data.pagination);
    } catch (err) {
      console.log(err);
    }
  };

  // Added a new button handler to navigate to Cart page
  const goToCart = () => {
    navigate("/cart");
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Navbar />
      <HeroBanner />
      <PincodeEntry />
      <SearchBar />
      <button onClick={goToCart} style={{ margin: "10px", padding: "10px", fontSize: "16px" }}>
        Go to Cart
      </button>
      <div className="container">
        {productData.map((elem, index) => {
          return (
            <div
              className="card"
              key={elem._id}
              onClick={() => navigate(`/products/${elem._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="top">
                <img src={elem.image} alt="" />
              </div>
              <div className="bottom">
                <h3>{elem.title}</h3>
                <p>{elem.description}</p>
                <h2>Price : {elem.price}</h2>
                {/* Added button to add product to cart */}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await fetch(`http://localhost:3000/cart/add/${elem._id}`, {
                        method: "POST",
                      });
                      alert("Product added to cart");
                    } catch (error) {
                      console.error("Error adding product to cart:", error);
                      alert("Failed to add product to cart");
                    }
                  }}
                  style={{ marginTop: "10px", padding: "5px 10px" }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination controls */}
      {pagination.pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            style={{ margin: "0 5px", padding: "5px 10px" }}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px", alignSelf: "center" }}>
            Page {currentPage} of {pagination.pages}
          </span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === pagination.pages}
            style={{ margin: "0 5px", padding: "5px 10px" }}
          >
            Next
          </button>
        </div>
      )}
      
      <BottomNav />
    </div>
  );
};

export default Home;

// Added a new button "Go to Cart" that redirects user to the Cart page for reviewing cart items.
