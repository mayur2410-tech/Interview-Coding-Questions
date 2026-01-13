const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const app = express();
const port = 3000;
const {dbConnection} = require('./config/db.js')

dbConnection;

app.listen(port,()=>{
console.log(`server is running on port${port}`)
})