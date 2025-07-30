import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import {Routes,Route} from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage'
import ProductDetail from './pages/ProductDetail'
import Addproducts from './pages/Addproducts'


function App() {

  return (
    <>
      {/* <div>
        <SignUpPage/>
      </div> */}
      <Routes>
        <Route path="/" element={<SignUpPage/>}/>
        <Route path="/SignInPage" element={<SignInPage/>}/>
        <Route path='/HomePage' element={<HomePage/>}/>
        <Route path='/ProductDetail/:id' element={<ProductDetail/>}/>
        <Route path='/admin/products/add' element={<Addproducts/>}/>

      </Routes>
    </>
  )
}

export default App
