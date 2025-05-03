const cors = require("cors");
const express = require("express");
const authRouter=require("./auth.router"); 
const taskRouter=require("./task.router");
const appRouter=(app)=>{
    
    app.use(express.json());
    app.use(cors());
    app.use('/auth',authRouter);
    app.use('/tasks',taskRouter);
};


 module.exports = appRouter;