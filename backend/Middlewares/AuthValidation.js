const joi= require('joi');

const signupValidation=(res,req,next)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(30).required(),
        email:joi.string().email().required(),
        password:joi.string().min(6).max(20).required()

    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad Request",error})
    }
    next();
}

const loginValidation=(res,req,next)=>{
    const schema=joi.object({
        
        email:joi.string().email().required(),
        password:joi.string().min(6).max(20).required()

    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad Request",error})
    }
    next();
}

module.exports={signupValidation,loginValidation};