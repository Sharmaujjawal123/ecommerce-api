 const express = require('express')
 const authRouters=require("./routes/auth.routes.js");
 const userRouters=require("./routes/user.routes.js")
 const cors=require("cors");
const app = express()
const port = 3000

app.use(express.json());
app.use(cors())


app.use("/auth",authRouters);
app.use("/api/users",userRouters);
module.exports=app;
