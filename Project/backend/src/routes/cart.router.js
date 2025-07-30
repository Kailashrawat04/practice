const express = require("express");
const cartModel = require("../models/cart.model");
const router = express.Router();

// For demonstration, userId is hardcoded or should be extracted from auth middleware
const demoUserId = "64a7f0f1c2a1b2c3d4e5f678"; // Replace with actual user id from auth

// GET /cart with product details for a user
router.get("/", async (req, res) => {
  try {
    const cartItems = await cartModel.find({ userId: demoUserId }).populate("productId"); // Filter by userId
    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// POST /cart/add/:productId - Add product to cart or increase quantity if exists
router.post("/add/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    // Check if product already in cart for user
    let cartItem = await cartModel.findOne({ userId: demoUserId, productId });

    if (cartItem) {
      // Increase quantity if exists
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // Create new cart item
      cartItem = new cartModel({ userId: demoUserId, productId, quantity: 1 });
      await cartItem.save();
    }

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /cart/increase/:cartItemId - Increase quantity
router.put("/increase/:cartItemId", async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await cartModel.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    cartItem.quantity += 1;
    await cartItem.save();
    res.status(200).json({ message: "Quantity increased", cartItem });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /cart/decrease/:cartItemId - Decrease quantity or remove if quantity 1
router.put("/decrease/:cartItemId", async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await cartModel.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      res.status(200).json({ message: "Quantity decreased", cartItem });
    } else {
      await cartModel.findByIdAndDelete(cartItemId);
      res.status(200).json({ message: "Cart item removed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
