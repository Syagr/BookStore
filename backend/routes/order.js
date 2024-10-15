const router = require('express').Router();
const authenticateToken = require('./userAuth');
const Book = require('../models/book');
const Order = require('../models/order');
const User = require('../models/user');

// place order
router.post('/place-order', authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers;
		const { order } = req.body;
		for (const orderData of order) {
			const newOrder = new Order({ user: id, book: orderData_id });
			const orderData = await newOrder.save();
			// saving order id in user model
			await User.findByIdAndUpdate(id, { $push: { orders: orderData._id } });
			// clearing cart
			await User.findByIdAndUpdate(id, { $pull: { cart: orderData.book } });
		}
		res.status(200).json({ message: "Order placed successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// get order history of a particular user
router.get('/get-order-history', authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers;
		const userData = await User.findById(id).populate("orders");
		const orderHistory = userData.orders;
		return res.json(orderHistory);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// get all orders --admin

router.get('/get-all-orders', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You do not have access to perform admin work" });
        }
        const orders = await Order.find()
            .populate({
                path: "user",
            })
            .populate({
                path: "book",
            })
            .sort({ createdAt: -1 });
        return res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// update order  --admin
router.put('/update-order', authenticateToken, async (req, res) => {
	try {
		const { id } = req.params;
		await Order.findByIdAndUpdate(id, { status: req.body.status });
		return res.json({ message: "Order updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
});


module.exports = router