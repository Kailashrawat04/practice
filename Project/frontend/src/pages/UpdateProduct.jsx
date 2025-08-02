import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [existingImage, setExistingImage] = useState('');

    useEffect(() => {
        // Fetch the existing product data
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/products/${productId}`);
                const product = res.data.product;
                setTitle(product.title);
                setDescription(product.description);
                setCategory(product.category);
                setPrice(product.price);
                setExistingImage(product.image);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        
        axios.post(`http://localhost:3000/products/update/${productId}`, formData)
            .then((res) => {
                console.log(res);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className='formContainer'>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        placeholder="Enter product title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        id="title"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="image">Image</label>
                    {existingImage && (
                        <div>
                            <p>Current Image:</p>
                            <img src={existingImage} alt="Current product" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        </div>
                    )}
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                    />
                    <p>Leave blank to keep current image</p>
                </div>

                <div className="formGroup">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        placeholder="Enter product description"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        placeholder="Enter product category"
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        placeholder="Enter product price"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
