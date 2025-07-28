import React, { useState } from 'react'

const Login = () => {

    const [title, settitle] = useState(null)
    const [description, setdescription] = useState(null)
    const [image, setimage] = useState(null)
    const [category, setcategory] = useState(null)
    const [price, setprice] = useState(null)

    const handleSubmit =(e)=>{
        e.preventDefault()

        const formData =new FormData()

        formData.append("title",title)
        formData.append("image",image)

        formData.append("description",description)

        formData.append("price",price)

    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title :</label>
                <input placeholder="Enter Title" type="text" 
                name="title" value={title}></input><br>
                
                </br>
                <label htmlFor="description">Description :</label>
                <input placeholder="Enter Description" type="text" name="description" value={description}></input><br></br>
                <label htmlFor="category">Category :</label>
                <input placeholder="Enter category" type="text" name="category" value={category}></input><br></br>
                <label htmlFor="price">Price :</label>
                <input placeholder="Enter price" type="text" name="price" value={price}></input><br></br>
                <label htmlFor="image">Image :</label>
                <input type="file" name="image" accept="image"></input><br></br>
                <button class="btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login