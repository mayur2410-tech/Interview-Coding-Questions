const dotenv = require("dotenv")
dotenv.config();

const express = require("express");
const app = express()
const port = 3000;

const {connectDb} = require('./config/db.js')
connectDb();
app.use(express.json())


app.listen(port,()=>{
    console.log(`server is runnig on port ${port}`)
})