// const express = require(express)
const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password :{
        type : String
    }
})
const userModel = mongoose.model("user",UserSchema)

module.exports = userModel