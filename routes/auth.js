const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        errrorMessage: "Bad Request",
      });
    }

    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res.status(400).json({ nessage: "user already exists" });
    }
    // write a check for mobile number

    const hashedPassword = await bcrypt.hash(password, 10);

    // await User.create({
    //     name,
    //     email,
    //     mobile,
    //     password: hashedPassword,
    // })

    const userData = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    const userResponse = userData.save();
    const token = await jwt.sign(
      { userId: userResponse._id },
      process.env.JWT_SECRET
    );

    res.json({ message: "User registered sucessfully",token:token });
  } catch (error) {}
  // valid check
  // error handling
  // check if user already exists
  // write into the database
  // create model/ schema
  // joi and yup
});

module.exports = router;
