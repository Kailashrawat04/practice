const express = require("express")


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended :true }))

app.get("/",(req,res)=>{
    let {name,email}= req.query
    console.log("name",name)
    console.log("email",email)

    res.send("data mill gaya")
    
})

app.post("/",(req,res)=>{

    let { name,email }= req.body
    console.log("name :",name);
    console.log("email :",email);
    res.send("data mil gya");
})

app.get("/user/:id", (req,res)=>{
    // const {id} =req.params
    // console.log("yeh id",id);
    // res.send("id mil gya");
    const id =req.params.id
    console.log("ye rahi id"+id);

    res.status(200).json({message :"id mil gya", id:id})
})

module.exports = app;