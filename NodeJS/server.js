const express = require('express');
const crud = require('./Day1-GET-POST/crud')
const movies = require('./Day3-Movies-CRUD/Movies')
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(crud)
app.use(movies)





app.listen(3000,()=>{
    console.log("server is start")
})