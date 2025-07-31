import React, { useState } from "react";
import "./PincodeEntry.css";

const PincodeEntry = () => {
  const [pincode, setPincode] = useState("");

  const handleChange = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Delivery estimate for pincode: ${pincode}`);
  };

  return (
    <div className="pincode-entry">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pincode">Enter Pincode</label>
        <input
          type="text"
          id="pincode"
          value={pincode}
          onChange={handleChange}
          placeholder="Use your pincode to find delivery estimate"
          maxLength={6}
        />
        <button type="submit">Check</button>
      </form>
    </div>
  );
};

export default PincodeEntry;
