import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUpPage = () => {
  const Navigate = useNavigate();


  const [FormCriteriaError, setFormCriteriaError] = useState("")
  const [FormData, setFormData] = useState({})
  const [RePassword, setRePassword] = useState("")
  const onNameChange = (e) => {
    setFormData({ ...FormData, name: e.target.value })
  }
  const onEmailChange = (e) => {
    setFormData({ ...FormData, email: e.target.value })
  }
  const onPasswordChange = (e) => {
    setFormData({ ...FormData, password: e.target.value })
  }
  const onRePasswordChange = (e) => {
    setRePassword(e.target.value)
  }
  const DataValidation = () => {

  }
  const handleSubmit = async (e) => {
    e.preventDefault()



    if ((FormData.email).includes("@")) {
      const password = FormData.password
      if (password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
        if ((FormData.password) == RePassword) {
          await axios.post("http://localhost:3000/SignUp/AddUser", { FormData })
            .then((res) => {
              if (res.data.out === true) {
                setFormCriteriaError(res.data.message)
              }
              else {
                Navigate("/SignInPage")
              }
              console.log(res, "FROM SIGNUPPAGE.JSX LINE 34")
            })
            .catch((err) => {
              console.log(err, "IN SIGNUPPAGE.JSX LINE 37")
            })
        }
        else {
          setFormCriteriaError("Passwords doesn't match ")
        }
      }
      else {
        setFormCriteriaError("Password doesn't meet specified criteria")
      }
    }
    else {
      setFormCriteriaError("Please Enter valid email")
    }

  }
  return (
    <div>
      <div>{FormCriteriaError}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Name">Name </label>
        <input placeholder='Enter Name' onChange={onNameChange} required></input><br />
        <label htmlFor="Email">Email</label>
        <input placeholder='Enter Email' onChange={onEmailChange} required></input><br />
        <label htmlFor="Password">Password</label>
        <input placeholder='Enter Password' onChange={onPasswordChange} required></input><br />
        <label htmlFor="RePassword">Re-Enter Password</label>
        <input placeholder='Re-Enter Password' onChange={onRePasswordChange} required></input><br />
        <input type='submit' value={"Sign Up"}></input>
      </form>
      <p>Already Registered ?<button onClick={() => Navigate("/SignInPage")}>Sign In</button></p>
    </div>
  )
}

export default SignUpPage
