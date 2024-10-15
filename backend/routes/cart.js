const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth");

// put book in cart
router.put("/add-book-to-cart", authenticateToken, async (req, res) => {
	try {
		const { bookid, id } = req.headers;
		const userData = await User.findById(id);
		const isBookInCart = userData.cart.includes(bookid);
		if (isBookInCart) {
			return res.status(200).json({ message: "Book already in cart" });
		}
		await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
		return res.status(200).json({ message: "Book added to cart" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// remove book from cart
router.delete("/remove-book-from-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        return res.status(200).json({ message: "Book removed from cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// get cart books of a particular user

router.get("/get-cart-books", authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers;
		const userData =
			await User.findById(id).populate("cart");
		const cartBooks = userData.cart;
		return res.json(cartBooks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;