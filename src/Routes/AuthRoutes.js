const route = require("express").Router();
const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");

route.post("/register", async (req, res) => {
  const { username, email, password, mobile } = req.body;

  try {
    if (
      !username ||
      !mobile||
      !email||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = new User({
      username,
      email,
      mobile,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.JWT_SECRET
      ).toString(),
    });

    const newSavedUser = await newUser.save();
    // imported
    const jwtSecret = process.env.JWT_SECRET || "default-secret";
    // GENErating token
    const token = jwt.sign(
      {
        userId: newSavedUser._id,
        username: newSavedUser.username,
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    res.status(200).json({ user: newSavedUser, token });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// Login

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET || "default-secret";

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("Wrong Credentials");
    }

    // Decrypt stored password and compare with the provided password
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      jwtSecret
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json("Wrong Credentials");
    }

    // If credentials are correct, create and send a JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecret, {
      expiresIn: "1d",
    });

    const { password: userPassword, ...others } = user._doc;

    res.status(200).json({ token, ...others });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});
module.exports = route;
