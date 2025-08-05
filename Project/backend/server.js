const express = require("express")
const app = require("./src/app")
const connect = require("./src/db/db")
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("..SERVER RUNNING AT PORT NUMBER :",PORT)
    connect()
})
