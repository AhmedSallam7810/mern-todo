
const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const { allTasks,createTask,updateTask,deleteTask } = require("../controllers/tasks.controller");
const { createTaskSchema,updateTaskSchema } = require("../validators/task.validator");
const validatorMiddleware = require("../middlewares/validator.middleware");

router.get("/",authMiddleware,allTasks);

router.post("/",authMiddleware,validatorMiddleware(createTaskSchema),createTask);

router.put("/:id",authMiddleware,validatorMiddleware(updateTaskSchema),updateTask);

router.delete("/:id",authMiddleware,deleteTask);


module.exports = router;
