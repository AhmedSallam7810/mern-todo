const joi=require("joi")

const registerSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    phone:joi.string().required()
})

const loginSchema=joi.object({
    email:joi.string().required(),
    password:joi.string().required()
})

module.exports={registerSchema,loginSchema}
