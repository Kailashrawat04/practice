const mongoose = require("mongoose")
const connect = () => {
    mongoose.connect("mongodb://localhost:27017/e-commerce")
        .then(() => {
            console.log("..DATABASE CONNECTED SUCCESFULLY..")
        })
        .catch(() => {
            console.log("..ERROR OCCURED IN DATABASE CONNECTION..")
        })
}

module.exports = connect