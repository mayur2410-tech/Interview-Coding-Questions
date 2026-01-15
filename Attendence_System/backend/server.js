const dotenv = require("dotenv")
dotenv.config()

const express = require('express')
const app = express();
const port = 3000;

const {dbConnection} = require('./config/db.js')
dbConnection();
app.use(express.json())

const authRoutes = require('./routes/authRoutes.js')

app.use('/auth',authRoutes)

app.listen(port,()=>{
console.log(`server is running on port${port}`)
})