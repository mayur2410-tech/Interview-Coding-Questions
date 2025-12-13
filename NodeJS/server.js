const express = require('express');
const crud = require('./Day1-GET-POST/crud')

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(crud)





app.listen(3000,()=>{
    console.log("server is start")
})