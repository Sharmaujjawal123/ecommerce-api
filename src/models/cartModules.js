const mongoose=require("mongoose");

const CartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cartItems",
        // required:true
    }],
    totalprice:{
        type:Number,
        // required:true
    },
    
    totalItems:{
        type:Number,
        // required:true,
        default:0
    },
    

   
})
const Cart=mongoose.model("cart",CartSchema);
module.exports=Cart;