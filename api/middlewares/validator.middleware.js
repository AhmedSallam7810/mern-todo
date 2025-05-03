const {errorResponse}=require("../utils/response");

const validatorMiddleware=(schema)=>{
    return (req,res,next)=>{
        const {error,value}=schema.validate(req.body);
        if(error){
            return errorResponse(res,error.details[0].message,400)
        }
        next();
    }
}

module.exports=validatorMiddleware
