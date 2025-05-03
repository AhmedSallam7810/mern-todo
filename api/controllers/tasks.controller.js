const Task=require("../DB/models/task.model");
const {successResponse,errorResponse}=require("../utils/response");
const {taskResource}=require("../resources/task.resourse");


const allTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({user:req.user.id});
        successResponse(res,tasks,"Tasks returned successfully")
    }catch(err){
        errorResponse(res,"Failed to fetch tasks")
    }
}

const createTask=async(req,res)=>{
    const {title,description,dueDate}=req.body;
    try{
        const task=await Task.create({
            title:title,
            description:description,
            dueDate:dueDate,
            user:req.user.id
        });

        successResponse(res,task,"Task created successfully")
    }catch(err){
        errorResponse(res,"Failed to create task")
    }
}

const updateTask=async(req,res)=>{
    data=req.body;
    try{
        const task=await Task.findOneAndUpdate(
            {_id:req.params.id,user:req.user.id},
            data,
            {new:true}
        );
        successResponse(res,task,"Task updated successfully")
    }catch(err){
        errorResponse(res,"Failed to update task")
    }
}   

const deleteTask=async(req,res)=>{
    try{
        const task=await Task.deleteOne({_id:req.params.id,user:req.user.id});
        successResponse(res,task,"Task deleted successfully")
    }catch(err){
        errorResponse(res,"Failed to delete task")
    }
}



module.exports={allTasks,createTask,updateTask,deleteTask};