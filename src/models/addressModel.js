const mongoose=require("mongoose");

const AddressSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    zipCode:{
        type:Number,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"users"
    }

   
})
const Address=mongoose.model("addresses",AddressSchema);
module.exports=Address;