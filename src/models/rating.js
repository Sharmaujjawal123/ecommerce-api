const mongoose=require("mongoose");

const RatingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    
    createdAt:{
       type:Date,
       default:Date.now(),
    },
    

   
})
const Rating=mongoose.model("rating",RatingSchema);
module.exports=Rating;