const {
  verifyToken,
  verifyTokenAuth,
  verifyTokenAndAdmin,
} = require("./VerifyToken");
const User = require("../Models/userSchema");
const userRoute = require("express").Router();

userRoute.put("/:id", verifyTokenAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.JWT_SECRET
      ).toString()
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

userRoute.delete("/:id", verifyTokenAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET USER

userRoute.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password: userPassword, ...others } = user._doc;

    res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET ALL Users

userRoute.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  

module.exports = userRoute;
