const express = require('express');
const fs = require("fs");
const path = require("path")
const router = express.Router();


const dbPath = path.join(__dirname,"./Todo.json");


router.get('/get/todos',(req,res)=>{
    try{
        const todos = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
        return res.status(200).json({message:"Success",todos});
    }catch(error){
        return res.status(500).json({message:"failled to read",error})
    }
})

router.post('/add/todo',(req,res)=>{
    try{
        const todo = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
        const {id,title,priority}= req.body;
        if(!id || !title|| !priority ){
            return res.status(400).json({message:"Al fields are required"})
        }
        const newTodo = {
            id,
            title,
            priority,
            status:"Pending"
        };
        todo.push(newTodo);
        fs.writeFileSync(dbPath,JSON.stringify(todo));
        return res.status(201).json({message:"Successfully created",newTodo})

    }catch(error){
        return res.status(500).json({message:"Failed to add todo",error})
    }
})

module.exports = router