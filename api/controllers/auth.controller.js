const User=require("../DB/models/user.model")
const bcrypt=require("bcrypt")
const {generateToken}=require("../utils/jwt")
const {successResponse,errorResponse,successTokenResponse}=require("../utils/response");
const {userResource}=require("../resources/user.resource");

const register=async(req,res)=>{
    const {name,email,password,phone}=req.body;

    try{
    const isUser= await User.findOne({email})
    if(isUser){
        return errorResponse(res,"Email already exists",400)
    }


    const hashPassword=bcrypt.hashSync(password,10)
    const user= User.create({name,email,password:hashPassword,phone});

    successResponse(res,user,"registered successfully");
    }catch(err){
        errorResponse(res,"Failed to register user")
    }
    
}

const login= async(req,res)=>{
    const {email,password}=req.body;
    try{
    const user= await User.findOne({email})
    if(!user){
        return errorResponse(res,"User not found",400)
    }
    const isPasswordValid=bcrypt.compareSync(password,user.password)
    const token=generateToken(user);
    if(!isPasswordValid){
        return errorResponse(res,"Invalid password",400)
    }
    const userData={
        id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone
    };
    successTokenResponse(res,userData,"Logged in successfully",token)
    }catch(err){
        errorResponse(res,"Failed to login")
    }
    
}

const logout=(req,res)=>{

}

const profile=async(req,res)=>{
    const user= await User.findById(req.user.id);

    successResponse(res,userResource(user),"Data returned successfully")
    
}

const updateProfile=async(req,res)=>{
    data=req.body;
    try{
    const user= await User.findById(req.user.id);

    if(data.password){
        const hashPassword= await bcrypt.hash(data.password,10)
        data.password=hashPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id,data,{new:true});
    successResponse(res,userResource(updatedUser),"Data updated successfully")
    }catch(err){
        errorResponse(res,"Failed to update data")
    }
}

module.exports={register,login,logout,profile,updateProfile}
