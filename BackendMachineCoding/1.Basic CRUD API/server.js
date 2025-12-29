const express = require('express')
const app = express();
app.use(express.json())

let users=[]
let id=1;

app.post('/user',(req,res)=>{
    const {name,email}= req.body;

    if(!email || !name){
        return res.status(400).json({message:"All field are Neccessary"})
    }

    const newUser = {
        id:id++,
        name:name,
        email:email
    }
    users.push(newUser)
    res.status(201).json({message:"user created successfully",newUser})
})

app.get("/users",(req,res)=>{
    res.json(users)
})

app.get("/users/:id",(req,res)=>{
    const user = users.find(u=>u.id == req.params.id)

    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    return res.status(200).json({message:"user found",user})
})

app.put('/user/:id',(req,res)=>{
    const updateUser = users.find(u=>u.id == req.params.id)
    if(!updateUser){
        return res.status(400).json({message:"User not found"})
    }

    updateUser.name = req.body.name || updateUser.name
    updateUser.email = req.body.email || updateUser.email

    res.status(200).json({message:"user update successfully",updateUser})
})

app.delete('/user/:id',(req,res)=>{
    users = users.filter(u=>u.id != req.params.id) 
    res.status(200).json({message:"user delete successfully"})
})

app.listen(3000,()=>{
    console.log("server is running ")
})