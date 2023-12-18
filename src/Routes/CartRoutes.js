const {
  verifyToken,
  verifyTokenAuth,
  verifyTokenAndAdmin,
} = require("./VerifyToken");
const Cart = require("../Models/Cart");
const cartRoute = require("express").Router();

// CREATE

cartRoute.post("/", verifyToken, async (req, res) => {
  const { userId, ...products } = req.body;
  const newCart = new Cart({ userId, products });

  try {
    const cartProduct = await newCart.save();
    res.status(200).json(cartProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


// UPDATE

cartRoute.put("/:id", verifyTokenAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      { id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

cartRoute.delete("/:id", verifyTokenAuth, async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ _id: req.body.productId });
    
    if (deletedCart) {
      res.status(200).json("Product has been deleted");
    } else {
      res.status(404).json("Product not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



// GET specific user cart itmes

cartRoute.get("/find/:userId", verifyTokenAuth, async (req, res) => {
  console.log(req.params.userId);
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json(err);
  }
});

// GET ALL

cartRoute.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cartProducts = await Cart.find();
    res.status(200).json(cartProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = cartRoute;
