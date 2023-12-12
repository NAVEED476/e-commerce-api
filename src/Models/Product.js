const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true
    },
    categories:{
        type:Array
    },
    price:{
        type:Number,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

module.exports = mongoose.model("product",productSchema)