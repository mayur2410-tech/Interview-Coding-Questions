const express = require('express')
const fs  = require('fs')
const path = require('path')

const router = express.Router();
const dbPath = path.join(__dirname,'./db.json');
console.log("path",dbPath)

router.post('/signup',(req,res)=>{

})