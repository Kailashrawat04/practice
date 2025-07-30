import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const Navbar = () => {
  return (
    <nav>
        <div className="left">
             <Link to="/admin"><h2>Shopy</h2></Link>
        </div>
        <div className='search'>
            <input type="text" />
        </div>
        <div className="right">
         
          <Link to="/admin/products/add">
           <i class="ri-shopping-cart-fill"></i>
           </Link>
        </div>
    </nav>
  )
}

export default Navbar
