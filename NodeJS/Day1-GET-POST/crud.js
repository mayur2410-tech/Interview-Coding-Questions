const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const dbPath = path.join(__dirname, './db.json')

//get data 
router.get('/get/data',(req,res)=>{
    try{
        const fileData = fs.readFileSync(dbPath,'utf8')
        const db = JSON.parse(fileData)
        return res.status(200).json({message:'success',data:db})
    }catch(error){
        console.log("error",error)
        return res.status(500).json({message:"failed to read db.json",error})

    }
})

router.post('/data', (req, res) => {   
    const {id,rollNo,Name} = req.body;
    if(!id || !rollNo || !Name){
        return res.status(400).json({message: "All fields are required"});
    }
    const fileData = fs.readFileSync(dbPath, 'utf8');
   

    const data = JSON.parse(fileData);
    data.push({id,rollNo,Name})

    fs.writeFileSync(dbPath, JSON.stringify(data));
    
    res.status(200).json({data:req.body,message:"data added successfully"});
    
});

module.exports = router