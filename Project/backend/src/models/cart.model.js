const mongoose = require("mongoose");

// Updated cart schema to include userId and quantity for user-specific carts and quantity management
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user", // Reference to user collection
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product", 
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  }
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
