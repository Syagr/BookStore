const express = require('express');
const app = express();
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const books = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");
app.use(express.json());

// Routes
app.use("/api/v1", user);
app.use("/api/v1", books);
app.get("/api/v1", favourite);
app.get("/api/v1", cart);
app.get("/api/v1", order);
// Creating port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});