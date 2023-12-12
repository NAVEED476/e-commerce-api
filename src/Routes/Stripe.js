const stripeRouter = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

stripeRouter.post("/payment",async(reseq,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd",
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.json(500).json(stripeErr)
        }else{
            res.json(200).json(stripeRes)
        }
    }
    )
})

module.exports = stripeRouter;