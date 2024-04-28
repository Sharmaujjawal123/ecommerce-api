const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        // required:true
    },

    orderitems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderItem",
        
    }],
    orderDate:{
        type:Date,
        required:true
    },
    
    deliveryDate:{
        type:Date,
        // required:true,
        
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    },

    paymentDetails:{
        paymentMethod:{
            type:String
        },
        transcationid:{
            type:String,
        },
        paymentid:{
            type:String
        },
        paymentStatus:{
            type:String,
            default:"PENDING"
        }
    },

    totalPrice:{
        type:Number,
        required:true
    },

    totalDiscountedPrice:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        required:true
    },
    totalitem:{
        type:Number,
        required:true
    },
    creaatedAt:{
        type:Date,
       default:Date.now()
    },
    
    

   
})
const Order=mongoose.model("order",orderSchema);
module.exports=Order;