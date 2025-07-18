
// document.addEventListener('DOMContentLoaded', () => {
//     const heading = document.querySelector('h1');
//     heading.textContent = 'Hello, World!';
// });
// console.log("hello")

// const sum = require("./math")

// console.log(sum(20,40));
// fs core module read file , update file, delete file

const fs = require('fs');

// fs.readFile("math.js",'utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//         return
//         }
//     else{
//         console.log(data);
//     }
    
// })

// fs.writeFile("text.txt","kya haal chal",(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log("file created");

// });

// fs.appendFile("text.txt"," sab thek",(err)=>{
//     if(err){
//            console.log(err);
//            return;
//     }
//     else{
//         console.log("data appended")
//     }

// })

// fs.unlink("text.txt",(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     else{   
//         console.log("file deleted");
//         }
// })

fs.mkdir("sample",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("folder created");
    }    
})


// fs.readdir("sample", (err, file) => {
//     if(err){    
//         console.log(err);
//         }
//         else{
//             console.log(file);
//             }
//     })  

    
     fs.rmdir("sample",{recursive: true, force:true}, (err)=>{
        if(err){
            console.log(err);
            }
    else{
                console.log("folder deleted");
                }
                })

