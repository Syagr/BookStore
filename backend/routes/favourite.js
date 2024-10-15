const router = require("express").Router();
const User = require("../models/user");
const authenticateToken = require("./userAuth");

// Add book to favourite

router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
	try {
		const { bookid, id } = req.headers;
		const userData = await User.findById(id);
		const isBookFavorite = userData.favourites.includes(bookid);
		if (isBookFavorite) {
			return res.status(200).json({ message: "Book already in favourites" });
		}
		await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
		return res.status(200).json({ message: "Book added to favourites" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// delete book from favourite

router.delete("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite = userData.favourites.includes(bookid);
        if (!isBookFavorite) {
            return res.status(200).json({ message: "Book not in favourites" });
        }
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// get Favourite books of a particular user

router.get("/get-favourite-books", authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers;
		const userData = await User.findById(id).populate("favourites");
		const favouriteBooks = userData.favourites;
		return res.json(favouriteBooks);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;