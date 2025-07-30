import React from 'react'
import Navbar from './components/Navbar'
import 'remixicon/fonts/remixicon.css'
import AddProducts from "./pages/Addproducts"
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import UserHome from './pages/userspage/UserHome'
import UserProductDetail from './pages/userspage/UserProductDetail'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import CartPage from './pages/CartPage'  // Added import for CartPage

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<UserHome/>}/> */}
        <Route path='/products/detail/:productId' element={<UserProductDetail/>}/>
        <Route path='/admin/products/add' element={<AddProducts/>}/>
        <Route path='/admin/products/detail/:productId' element={<ProductDetail/>}/>
        <Route path='/' element={<SignUpPage/>}/>
        <Route path='/SignInPage' element={<SignInPage/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/cart' element={<CartPage/>}/>  {/* Added route for CartPage */}
      </Routes>
    </div>
  )
}

export default App
