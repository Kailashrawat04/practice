import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'


import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from localStorage or other means
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    // Clear login status and redirect to sign-in page
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/SignInPage');
  };

  return (
    <nav>
        <h2 style={{cursor: 'pointer'}} onClick={() => navigate('/')}>Shopy</h2>
        <div className='search'>
            <input type="text" />
            <i class="ri-search-line"></i>
        </div>
        <div className="right">
          <Link to="/admin/products/add">Add new Product</Link>
          {isLoggedIn && <button onClick={handleLogout} className="logout-button">Logout</button>}
        </div>
    </nav>
  )
}

export default Navbar
