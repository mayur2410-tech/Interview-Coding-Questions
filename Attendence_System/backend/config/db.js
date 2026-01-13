const mongoose = require('mongoose')

const dbConnection = mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connect to mongo")})
    .catch((error)=>{
        console.log("failed to connect to mongo",error)
    })


module.exports = {dbConnection}