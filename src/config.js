const mongoose = require("mongoose")

const mongUrl="mongodb://localhost:27017/Ecommerce-Data"

const connectDb=()=>{
return mongoose.connect(mongUrl);
}

module.exports={connectDb}