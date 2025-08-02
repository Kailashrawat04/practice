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

    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get products with pagination
    const products = await productModel.find().skip(skip).limit(limit);

    res.status(200).json({ 
      message: "data found", 
      products,
      pagination: {
        page,
        limit,
        total: productsCount,
        pages: Math.ceil(productsCount / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});



router.post("/add", upload.single("image"), async (req, res) => {
  try {
    // Validate required fields
    const { title, description, category, price } = req.body;
    
    if (!title || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if image is provided
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      isPrivateFile: false,
      isPublished: true
    });

    const imageUrl = result.url;

    const product = new productModel({
      title: title,
      description: description,
      category: category,
      price: price,
      image: imageUrl
    });

    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate product ID format
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});

router.get("/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate product ID format
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.render("updateForm", { product: product });
  } catch (error) {
    console.error("Error fetching product for update:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});

router.post("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate product ID format
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Validate required fields
    const { title, description, category, price } = req.body;

    if (!title || !description || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if product exists
    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Prepare update data
    const updateData = {
      title: title,
      description: description,
      category: category,
      price: price
    };

    // Handle image update if a new image is provided
    if (req.file) {
      const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      });

      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        isPrivateFile: false,
        isPublished: true
      });

      updateData.image = result.url;
    }

    // Update the product
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Validate product ID format
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Check if product exists
    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productModel.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

// Get recommended products (excluding a specific product)
router.get("/recommended", async (req, res) => {
  try {
    const { excludeId } = req.query;
    let query = {};
    
    // If excludeId is provided and valid, exclude that product
    if (excludeId && excludeId.match(/^[0-9a-fA-F]{24}$/)) {
      query._id = { $ne: excludeId };
    }
    
    // Get up to 4 random products
    const products = await productModel.aggregate([
      { $match: query },
      { $sample: { size: 4 } }
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    res.status(500).json({ message: "Error fetching recommended products", error: error.message });
  }
});

// Search products by title, description, or category
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query; // Search query
    
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    // Create a regex for case-insensitive search
    const regex = new RegExp(q, 'i');
    
    // Search in title, description, or category
    const products = await productModel.find({
      $or: [
        { title: regex },
        { description: regex },
        { category: regex }
      ]
    });

    res.status(200).json({ message: "Search results", products });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Error searching products", error: error.message });
  }
});

// Get products by category
router.get("/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    
    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }
    
    // Create a regex for case-insensitive search
    const regex = new RegExp(`^${categoryName}$`, 'i');
    
    const products = await productModel.find({ category: regex });

    res.status(200).json({ message: `Products in category ${categoryName}`, products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products by category", error: error.message });
  }
});

// Get products within a price range
router.get("/price-range", async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    
    if (!minPrice && !maxPrice) {
      return res.status(400).json({ message: "At least one of minPrice or maxPrice is required" });
    }
    
    let query = {};
    
    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }
    
    const products = await productModel.find(query);

    res.status(200).json({ message: "Products in price range", products });
  } catch (error) {
    console.error("Error fetching products by price range:", error);
    res.status(500).json({ message: "Error fetching products by price range", error: error.message });
  }
});

module.exports = router;
