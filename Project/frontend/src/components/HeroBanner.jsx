import React from "react";
import "./HeroBanner.css";

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-overlay">
        <h1>BEST OF LINEN</h1>
        <p>Trendy | Comfortable | Breathable</p>
        <button className="hero-cta">WEAR NOW</button>
      </div>
    </div>
  );
};

export default HeroBanner;
