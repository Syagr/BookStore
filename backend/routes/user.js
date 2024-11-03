const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require("../middleware/userAuth");

// Sign up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (username.length < 4) {
      return res.status(400).json({ message: "Username should be greater than 3" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 5) {
      return res.status(400).json({ message: "Password should be greater than 3" });
    }

    const hashPass = await bcrypt.hashSync(password, 10);

    const user = new User({
      username,
      email,
      password: hashPass,
      address,
    });
    await user.save();
    res.status(200).json({ message: "SignUp Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// // Sign up
// router.post("/sign-up", async (req, res) => {
//   try {
//     const { username, email, password, address, role } = req.body;

//     if (username.length < 4) {
//       return res.status(400).json({ message: "Username should be greater than 3" });
//     }

//     const existingUsername = await User.findOne({ username });
//     if (existingUsername) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     const existingEmail = await User.findOne({ email });
//     if (existingEmail) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     if (password.length < 5) {
//       return res.status(400).json({ message: "Password should be greater than 3" });
//     }

//     const hashPass = await bcrypt.hashSync(password, 10);

//     const user = new User({
//       username,
//       email,
//       password: hashPass,
//       address,
//       role: role || 'user', // Default role is 'user'
//     });
//     await user.save();
//     res.status(200).json({ message: "SignUp Successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Sign in
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Username does not exist" });
    }

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookStore123", { expiresIn: "30d" });
        res.status(200).json({ id: existingUser._id, role: existingUser.role, token });
      } else {
        res.status(400).json({ message: "Password is incorrect" });
      }
    });
  } catch (error) {
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
    await User.findByIdAndUpdate(id, { address });
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user information
router.put("/update-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { username, email, address } = req.body;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new username or email already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists && usernameExists._id.toString() !== id) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id.toString() !== id) {
      return res.status(400).json({ message: "Email already exists" });
    }

    existingUser.username = username;
    existingUser.email = email;
    existingUser.address = address;

    await existingUser.save();

    res.status(200).json({ message: "User information updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;