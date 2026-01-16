const moongoose = require("mongoose");

const connectDb =  async ()=>{

    try{
        await moongoose.connect(process.env.MONGO_URL)
        console.log("mongo db connected sucecssfully")
    }catch(error){
        console.log("error in connecting ",error.message)
    }

}

module.exports = {connectDb};