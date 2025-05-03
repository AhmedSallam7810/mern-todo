
const taskResource=(task)=>{
    return {
        id:task._id,
        title:task.title,
        description:task.description,
        dueDate:task.dueDate,
        user:task.user
    }
}

module.exports=taskResource
