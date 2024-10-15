const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./userAuth');

// Sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        
        // Check username length is more than 3
        if (username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username should be greater than 3" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res 
                .status(400)
                .json({ message: "Username already exists" });
        }

        // Check if email already exists
		const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res
                .status(400)
                .json({ message: "Email already exists" });
        }

        // Check password length
        if (password.length < 5) {
            return res
                .status(400)
                .json({ message: "Password should be greater than 3" });
		}
		const hashPass = await bcrypt.hashSync(password, 10);

        const user = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address,
        });
        await user.save();
        res.status(200).json({ message: "SignUp Successfully" });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: "Internal server error" });
    }
});


// Sign in

router.post("/sign-in", async (req, res) => {
	try {
		const { username, password } = req.body;

		const existingUser = await User.findOne({ username });
		if (!existingUser) {
			return res.status(400).json({ message: "Username does not exist" });
		}
		await bcrypt.compare(password, existingUser.password, (err, data) => {
			if (data)
			{
				const authClaims = [
					{ name: existingUser.username },
					{ role: existingUser.role },
				]
				const token = jwt.sign ({authClaims}, "bookStore123", {expiresIn: "30d"});
				res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });
			}
			else
			{
				res.status(400).json({ message: "Password is incorrect" });
			}
		}
		);
	}
	catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Get user by id
router.get("/get-user-information", authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers;
		const data = await User.findById(id).select("-password");
		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Update address

router.put("/update-address", authenticateToken, async (req, res) => {
	try {
		const { id } = req.headers;
		const { address } = req.body;
		await User
			.findByIdAndUpdate
			(id, { address: address });
		res.status(200).json({ message: "Address updated successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;