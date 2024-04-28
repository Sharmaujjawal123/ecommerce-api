const { connectDb } = require("./config");
const app=require("./index")
const port=5454;
app.listen(port, async() =>{
await connectDb();
console.log(`Example app listening on port ${port}!`)})