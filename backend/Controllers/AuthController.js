const bcrypt= require('bcrypt');
const UserModel=require('../Models/User');
const jwt=require('jsonwebtoken');


const signup = async (req, res) => {
    try{
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const UserModel=new UserModel({name,email,password});
        UserModel.password=await bcrypt.hash(password,10);
        await UserModel.save();
        res.status(201).json({message:"Signup successful",success:true});
    }catch(err){
        res.status(500).json({message:"Internal server error",success:false});

    }
}

const login = async (req, res) => {
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        const errmsg="Email or password is wrong";
        if(!user){
            return res.status(403).json({message:errmsg,success:false});
        }
       const ispassEqual= await bcrypt.compare(password,user.password);
       if(!ispassEqualp){
        return res.status(403).json({message:errmsg,success:false});
       }
       const jwtToken=jwt.sign({email:user.email,_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'});

        res.status(200).json({
            message:"Login successful",
            success:true,
            jwtToken
        })
        res.status(201).json({message:"Signup successful",success:true});
    }catch(err){
        res.status(500).json({message:"Internal server error",success:false});

    }
}

module.exports={signup,login};