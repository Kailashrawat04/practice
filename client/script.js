

const http = require("http")
let server = http.createServer((req , res)=>
{
    if (req.url === "/" && req.method === "GET") {
        res.end("<h1>Welcome to the Home Page</h1>");
    }
    else if (req.url === "/" && req.method === "POST") {
        res.end("<h1>Welcome to the Home Page  Post</h1>");
    }
    else if(req.url==="/"){
        res.end("Home Route")
    }
    else if(req.url==="/about"){
        res.end("about Route")
    }
})
let port=3000
server.listen(port, ()=>{
    console.log("Server is running on port no:",port);
})