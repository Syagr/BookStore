const router = require("express").Router();
const Book = require("../models/book");
const User = require("../models/user");
const authenticateToken = require("../middleware/userAuth");

// Add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({ message: "You do not have access to perform admin work" });
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
    res.status(200).json({ message: "Book added successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
});

// Update book --admin
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
    res.status(200).json({ message: "Book updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});

// Delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.headers;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: "Book deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});

// Get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({ books, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});

// Get recently added books
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({ books, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});

// Get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({ book, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", success: false });
  }
});

module.exports = router;