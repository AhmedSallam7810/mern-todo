
const userResource=(user)=>{
    return {
        id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone
    }
}

module.exports=userResource
