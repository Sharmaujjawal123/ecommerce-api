const mongoose=require("mongoose");

const ProductSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        // required:true
    },

  
  
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true 
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    discountPersent:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    sizes:[{
        name:{type:String},
        quantity:{type:Number}
    }],
    imageUrl:{
        type:String,
    },
    rating:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"

    }],
    numRating:{
        type:Number,
        default:0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:"categories"
    },


    
    

   
})
const Product=mongoose.model("products",ProductSchema);
module.exports=Product;