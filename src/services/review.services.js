const Review = require("../models/reviewsmodal.js");
const productService=require("../services/product.service.js");
async function createReview (reqData, user) {
const product=await productService. findProductById(reqData.productId);
I
const review=new Review({
user: user._id,
product:product._id,
review: reqData.review,
createdAt: new Date(),
})
await product.save();
return await review.save();
}
async function getAllReivew (productId) {
const product=await productService. findProductById(reqData.productId);
return await Review.find({product:productId}).populate("user");
}
module.exports={createReview,getAllReivew}