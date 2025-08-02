import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const UserProductDetail = () => {

   const {productId} = useParams()
   const navigate = useNavigate()
    
    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products/" + productId);
                console.log(res);
                setproductData(res.data.product);
            } catch (err) {
                console.log(err);
            }
        };
        getProductDetail();
    }, [productId]);
    
    const [productData, setproductData] = useState({});

    const handleEdit = () => {
        navigate(`/update-product/${productId}`);
    };

  return (
    <div className='product-container'>
     
      <div className="main">
        <div className="left">
            <img src={productData.image} alt="" />
        </div>
        <div className="right">
            <h1>{productData.title}</h1>
            <p>{productData.description}</p>
            <p>Category: {productData.category}</p>
            <p>Price: ${productData.price}</p>

            <div className="bottom">
                <button onClick={handleEdit}>Edit Product</button>
                <button>Buy now</button>
                <button>Add to Cart</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserProductDetail
