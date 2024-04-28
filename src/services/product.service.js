const Category=require("../models/cateogaryModel.js");
const Product = require("../models/productmodel.js");

async function createProduct(reqData){
    let topLevel=await Category.findOne({name:reqData.topLevelCategory});

    if(!topLevel){
        
        topLevel=new Category({
            name: reqData.topLevelCategory,
            lavel:1
            })
            }


            let secondLevel=await Category.findOne({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            })
            if(!secondLevel){
            secondLevel=new Category({
            name: reqData. secondLevelCategory,
            parentCategory:topLevel._id,
            level:2
            })
        }

        let thirdLevel=await Category.findOne({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            })
            if(!thirdLevel){
            thirdLevel=new Category({
            name: reqData. thirdLevelCategory,
            parentCategory:secondLevel._id,
            level:3
            })
        }
     

        const product = new Product({
            title:reqData.title,
            color:reqData.color,
            description: reqData.description,
            discountedPrice: reqData.discountedPrice,
            discountPersent: reqData.discountPersent,
            imageUrl: reqData.imageUrl,
            brand: reqData.brand,
            price:reqData.price,
            sizes: reqData.size,
            quantity: reqData.quantity,
            category:thirdLevel. id,
            })
            return await product.save();
            }
     
            async function deleteProduct (productId){
                const product= await findProductById(productId);
                await Product.findByIdAndDelete (productId);
                return "Product deleted Successfully";
                }

                async function updateProduct(productId,reqData){
                return await Product.findByIdAndUpdate (productId, reqData);
                }
                async function findProductById(id){
                const product = await Product.findById(id).populate("category").exec();
                if(!product){
                throw new Error("Product not found with id "+ id);
                }
                return product;
            }

            async function getAllProducts (reqQuery) {
                let {category, color, sizes, minPrice, maxPrice, minDiscount, sor, stock, pageNumber, pageSize}
                =reqQuery;
                pageSize-pageSize || 10;
                let query= Product.find().populate("category");
                if(category) {
                const existCategory=await Category.findOne({name: category});
                if(existCategory){
                query=query.where("category").equals (existCategory._id);
                }
                else {
                return {content:[], curentPage:1,totalPages:0}
                }
            }
 
            if(color) {
                const colorSet = new Set (color.split(",").map(color=> color.trim().toLowerCase()));
                const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"): null;
                query=query.where("color").regex (colorRegex);
                }



                // do later next thong


        }
        async function createMultipleProduct (products) {
            for (let product of products) {
            await createProduct (product);
            }
            }
            module.exports={
            createProduct,
            deleteProduct,
            updateProduct,
            getAllProducts,
            createMultipleProduct
            }
