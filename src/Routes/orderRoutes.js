const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAndAdmin,
  } = require("./VerifyToken");
  const Order = require("../Models/Order");
  const orderRoute = require("express").Router();

  // CREATE

  orderRoute.post("/",verifyToken, async(req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const orderdproduct = await newOrder.save();
        res.status(200).json(orderdproduct)
    }catch(err){
        res.status(500).json(err)
    }

  })

  // UPDATE
  
  orderRoute.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE
  
  orderRoute.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("product has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  // GET user cart
  
  orderRoute.get("/find/:userId",verifyTokenAuth, async (req, res) => {
      try {
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  // GET ALL 
  
  orderRoute.get("/",verifyTokenAndAdmin, async (req, res) => {
      try {
        const orders = await Order.find();
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
    
  
  module.exports = orderRoute;
  