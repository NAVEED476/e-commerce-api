const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAndAdmin,
  } = require("./VerifyToken");
  const Cart = require("../Models/Cart");
  const cartRoute = require("express").Router();

  // CREATE

  cartRoute.post("/",verifyToken, async(req,res)=>{
    const newCart = new Cart(req.body)

    try{
        const cartProduct = await newCart.save();
        res.status(200).json(cartProduct)
    }catch(err){
        res.status(500).json(err)
    }

  })

  // UPDATE
  
  cartRoute.put("/:id", verifyTokenAuth, async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
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
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("product has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  // GET user cart
  
  cartRoute.get("/find/:userId",verifyTokenAuth, async (req, res) => {
      try {
        const cart = await Cart.find({userId: req.params.userId});
        res.status(200).json(cart);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  // GET ALL 
  
  cartRoute.get("/",verifyTokenAndAdmin, async (req, res) => {
      try {
        const cartProducts = await Cart.find();
        res.status(200).json(cartProducts);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
    
  
  module.exports = cartRoute;
  