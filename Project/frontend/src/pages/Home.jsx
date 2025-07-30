import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get("http://localhost:3000/")
      .then((res) => {
        console.log(res.data.products);
        setProductData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Added a new button handler to navigate to Cart page
  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <Navbar />
      <button onClick={goToCart} style={{ margin: "10px", padding: "10px", fontSize: "16px" }}>
        Go to Cart
      </button>
      <div className="container">
        {productData.map((elem, index) => {
          return (
            <div className="card" key={index}>
              <div className="top">
                <img src={elem.image} alt="" />
              </div>
              <div className="bottom">
                <Link to={`/admin/products/detail/${elem._id}`}>{elem.title}</Link>
                <p>{elem.description}</p>
                <h2>Price : {elem.price}</h2>
                {/* Added button to add product to cart */}
                <button
                  onClick={async () => {
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
    </div>
  );
};

export default Home;

// Added a new button "Go to Cart" that redirects user to the Cart page for reviewing cart items.
