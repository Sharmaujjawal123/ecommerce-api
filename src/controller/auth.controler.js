const userService=require("../services/user.service.js")
const bcrypt=require('bcrypt')
const cartService=require("../services/cart.service.js")
const jwtProvider=require("../jwtprovider.js")

const register=async(req,res)=>{

    try {
        const user=await userService.createUser(req.body);
        const jwt=jwtProvider.generateToken(user._id);
        await cartService.createCart(user);
        return res.status(200).send({jwt, message: "register success"})
        } 
        catch (error) {
        return res.status (500).send({error:error.message});
        }
        }


        const login=async(req, res)=>{
        
        const {password, email}=req.body
        try {
        const user=await userService.getUserByEmail(email);

        if(!user){
            return res.status(404).send({message:'us er not found with email : ',email})
        }

        const isPasswordvalid=await bcrypt.compare(password,user.password);

        if(!isPasswordvalid){
            return res.status(401).send(message,"Invalid password");
        }

        const jwt=jwtProvider.generateToken(user._id);
        return res.status(200).send({jwt,message:"login success"});
        } 
        
        catch (error) {
            return res.status (500).send({error:error.message});
        }
    }


    module.exports={register,login};
