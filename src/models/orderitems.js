const mongoose=require("mongoose");

const orderItemSchema=new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true
    },

  
    
   
    size:{
        type:String,
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:String,
        required:true
    },
    useId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    
    
    

   
})
const OrderItem=mongoose.model("orderItem",orderItemSchema);
module.exports=OrderItem;