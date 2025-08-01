const mongoose = require("mongoose")
const connect = () => {
    mongoose.connect( process.env.MONGO_URI)

        .then(() => {
            console.log("..DATABASE CONNECTED SUCCESFULLY..")
        })
        .catch(() => {
            console.log("..ERROR OCCURED IN DATABASE CONNECTION..")
        })
}

module.exports = connect