const express = require('express')
const app = express();

app.use(express.json());

const USER = {
    email:"mayur@gmail.com",
    pass:"pass@123"
}

app.post('/login',(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"all fields are required"})
    }

    if(email == USER.email && password == USER.pass){
        return res.status(200).json({message:"Login Succefull"})
    }else{
        return res.status(400).json({message:"Invalid email or password"})
    }

})

app.listen(3000,()=>{
    console.log("server is running")
})