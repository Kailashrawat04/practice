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
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
                console.error(err);
                setError('Error fetching product data');
            }
        };

        fetchProduct();
    }, [productId]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            let formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('price', price);
            
            // Only append image if a new one is selected
            if (image) {
                formData.append('image', image);
            }
            
            const res = await axios.post(`http://localhost:3000/products/update/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log(res.data);
            navigate("/home");
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error updating product');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='formContainer'>
            <h2>Update Product</h2>
            {error && <div className="error">{error}</div>}
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
                        required
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
                        onChange={handleImageChange}
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
                        required
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
                        required
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
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Product'}
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
