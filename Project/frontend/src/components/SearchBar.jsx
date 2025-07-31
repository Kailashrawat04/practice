import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder='Search "white shirt"' />
      <button className="search-button">🔍</button>
    </div>
  );
};

export default SearchBar;
