const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  books: {
    type: mongoose.Types.ObjectId,
    ref: "Book",
  },
  status: {
    type: String,
    default: "Order Placed",
    enum: ["Order Placed", "Out of delivery", "Canceled", "Delivered"],
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);