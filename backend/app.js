const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
require("dotenv").config();
require("./conn/conn");

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
}));

const user = require("./routes/user");
const books = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

app.use(express.json());

// Routes
app.use("/api/v1", user);
app.use("/api/v1", books);
app.use("/api/v1", favourite);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// Creating port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});