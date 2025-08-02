import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./productDetail.css"
import axios from 'axios'
import RecommendedProducts from '../components/RecommendedProducts'

const ProductDetail = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getProductDetail()
  }, [])

  const getProductDetail = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products/" + productId)
      setProduct(res.data.product)
    } catch (err) {
      console.log(err)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('Error fetching product')
      }
    }
  }

  const addToCart = async () => {
    try {
      await axios.post(`http://localhost:3000/cart/add/${productId}`)
      alert("Product added to cart")
    } catch (error) {
      console.error("Error adding product to cart:", error)
      alert("Failed to add product to cart")
    }
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className='product-container'>
      <div className="main">
        <div className="left">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="right">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>Price: {product.price}</h2>
          <button onClick={addToCart} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
            Add to Cart
          </button>
        </div>
      </div>
      <RecommendedProducts currentProductId={productId} />
    </div>
  )
}

export default ProductDetail
