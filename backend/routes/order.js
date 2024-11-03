const router = require("express").Router();
const Order = require("../models/order");
const authenticateToken = require("../middleware/userAuth");

// Place an order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { userId, bookIds } = req.body;
    const order = new Order({
      user: userId,
      books: bookIds,
      status: "Order Placed",
    });
    await order.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get orders of a particular user
router.get("/get-orders", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.headers;
    const orders = await Order.find({ user: userId }).populate("books");
    return res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update order status --admin
router.put("/update-order-status", authenticateToken, async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;