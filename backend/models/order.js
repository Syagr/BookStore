const mongoose = require('mongoose');

const order = new mongoose.Schema({
	user : {
		type: mongoose.Types.ObjectId,
		ref: "user",
	},
	books : {
		type: mongoose.Types.ObjectId,
		ref: "books",
	},
	status: {
		type: String,
		default: "Order Placed",
		enum: ["Order Placed", "Out of delivery, Canceled, Delivered"],
	},
},
	{ timestamps: true }
);
module.exports = mongoose.model("order", order);