const express = require("express");
const productModel = require("../models/product.model");
const ImageKit = require("imagekit");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();



router.get("/", async (req, res) => {
  try {
    const productsCount = await productModel.countDocuments();

    if (productsCount === 0) {
      // Insert sample products if collection is empty
      const sampleProducts = require("../data/sampleProducts");
      await productModel.insertMany(sampleProducts);
    }

    const products = await productModel.find();

    res.status(200).json({ message: "data found", products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});



router.post("/add", upload.single("image"), async (req, res) => {

  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });


  const result = await imagekit.upload({
    file : req.file.buffer,
    fileName : req.file.originalname,
    isPrivateFile : false,
    isPublished : true
  })

  const imageUrl = result.url

 
  const { title, description, category, price } = req.body;
  

      const product = new productModel(
          {
              title : title,
              description : description,
              category : category,
              price : price,
              image : imageUrl
           }
  )

      await product.save()

  res.json({message : "data aaya"})
});

router.get("/:id",async (req, res)=>{
    const productId = req.params.id

    const product = await productModel.findById(productId)

    console.log(product);


    res.status(200).json({message : "data mil gya " , product})
    
})

router.get("/update/:id", async(req, res)=>{

    const productId = req.params.id

    const product = await productModel.findById(productId)


    res.render("updateForm",{product : product})
})


router.post("/update/:id",upload.single("image") ,async(req, res)=>{

    const productId = req.params.id

    console.log(req.body);
    
  const { title, description, category, price } = req.body;

  
  const imagekit = new ImageKit({
    publicKey: "public_L3kpvLYtMKNloFHN19RlVaWuQFg=",
    privateKey : "private_oBpoRPnqhqmSCzw538+8WzgTRik=",
    urlEndpoint: "https://ik.imagekit.io/am9cemqwb",
  });


  const result = await imagekit.upload({
    file : req.file.buffer,
    fileName : req.file.originalname,
    isPrivateFile : false,
    isPublished : true
  })

  const imageUrl = result.url

    await productModel.findByIdAndUpdate(productId,{
    title : title,
    description : description,
    category : category,
    price : price,
    image : imageUrl
  })

  res.redirect(`/products/${productId}`)
    
})


router.get("/delete/:id" , async (req,res)=>{
    const productId = req.params.id

    await productModel.findByIdAndDelete(productId)

    res.redirect("/")
})



module.exports = router;