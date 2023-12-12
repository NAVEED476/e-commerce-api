const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAndAdmin,
  } = require("./VerifyToken");
  const Product = require("../Models/Product");
  const productRoute = require("express").Router();

  // CREATE

  productRoute.post("/create",verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const saveProdcut = await newProduct.save();
        res.status(200).json(saveProdcut)
    }catch(err){
        res.status(500).json(err)
    }

  })

  // UPDATE
  
  productRoute.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE
  
  productRoute.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("product has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  // GET Product
  
  productRoute.get("/find/:id", async (req, res) => {
      try {
        const getProduct = await Product.findById(req.params.id);
        res.status(200).json(getProduct);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  // GET ALL Products
  
  productRoute.get("/", async (req, res) => {
      try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
    
  
  module.exports = productRoute;
  