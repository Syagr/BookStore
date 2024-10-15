const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const authenticateToken = require("./userAuth");

// Add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res
                .status(400)
                .json({ message: "You do not have access to perform admin work" });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// update book --admin

router.put("/update-book", authenticateToken, async (req, res) => {
	    try {
			const { bookId } = req.headers;
			await Book.findByIdAndUpdate(bookId, {
				url: req.body.url,
				title: req.body.title,
				author: req.body.author,
				price: req.body.price,
				desc: req.body.desc,
				language: req.body.language,
			});
			res.status(200).json({ message: "Book updated successfully" });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
	try {
		const { bookId } = req.headers;
		await Book.findByIdAndDelete(bookId);
		res.status(200).json({ message: "Book deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
});

// get all books
router.get("/get-all-books", async (req, res) => {
	try {
		const books = await Book.find().sort({ createdAt: -1 });
		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
});

// get recently added books
router.get("/get-recent-books", async (req, res) => {
	try {
		const books = await Book.find().sort({ createdAt: -1 }).limit(5);
		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
});

// get book by id

router.get("/get-book-by-id/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const book = await  Book.findById(id);
		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
});

module.exports = router;