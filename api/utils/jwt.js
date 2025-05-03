const jwt=require("jsonwebtoken")

const secret ="secret"         //should be process.env.JWT_SECRET fro real senario

const generateToken=(user)=>{
    return jwt.sign({id:user._id,email:user.email},secret,{expiresIn:"24h"})
}



const verifyToken=(token)=>{
    return jwt.verify(token,secret,(err,decoded)=>{
        if(err){
            return null
        }
        return decoded
    })
}


module.exports={generateToken,verifyToken}