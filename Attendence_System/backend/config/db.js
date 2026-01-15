const mongoose = require('mongoose')

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connection Successfull")
    }catch(error){
        console.log("Failed to connect to mongo",error)
    }

}

module.exports = {dbConnection}