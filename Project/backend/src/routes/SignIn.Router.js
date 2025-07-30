const express = require("express")
const userModel = require("../models/user.model")
const router = express.Router()
router.post("/ValidateUser", async (req, res) => {
    const { email, password } = req.body.FormData
    console.log(email)
    console.log(password)
    const Users = await userModel.find()
    for (let index = 0; index < Users.length; index++) {
        const element = Users[index];
        if (element.email == email) {
            if (element.password == password) {
                res.status(200).json({ message: "User Exists", out: true })
            }
            else {
                res.status(200).json({ message: "Email or Password is incorrect", out: false })
            }
            return
        }
    }
    res.status(200).json({ message: "User doesn't exists", out: false })
})
module.exports = router