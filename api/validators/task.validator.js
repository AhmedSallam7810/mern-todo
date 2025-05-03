const joi=require("joi")

const createTaskSchema=joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    status:joi.string().valid("pending","completed").default("pending"),
    dueDate:joi.date().required()
})

const updateTaskSchema=joi.object({
    title:joi.string(),
    description:joi.string(),
    status:joi.string().valid("pending","completed").default("pending"),
    dueDate:joi.date()
})

module.exports={createTaskSchema,updateTaskSchema}
