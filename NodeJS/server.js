const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());



app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.post('/data', (req, res) => {   
    const {id,rollNo,Name} = req.body;
    if(!id || !rollNo || !Name){
        return res.status(400).json({message: "All fields are required"});
    }
    const data = JSON.parse(fs.readFileSync("./db.json",'utf-8'));
    data.push({id,rollNo,Name})

    fs.writeFileSync('./db.json', JSON.stringify(data));
    res.status(200).json({data:req.body,message:"data added successfully"});
    
});



app.listen(3000,()=>{
    console.log("server is start")
})