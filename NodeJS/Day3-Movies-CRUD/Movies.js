const express = require('express')
const fs = require("fs");
const path = require("path")
 const router = express.Router();

const dbPath = path.join(__dirname,'./Movies.json');

router.get('/get/movies',(req,res)=>{
    const movie = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
    res.json(movie);
})

router.post('/movies', (req, res) => {
    const { id, title, year } = req.body;

    const data = { id, title, year };

    const fileData = fs.readFileSync(dbPath, 'utf8');
    const json = fileData ? JSON.parse(fileData) : [];

    json.push(data);

    fs.writeFileSync(dbPath, JSON.stringify(json, null, 2));

    res.send("Data saved");
});


router.put('/update-movies/:id',(req,res) => {
    try{
            // console.log("enter")
        const {title,year}= req.body;
        // console.log("start")
        const data = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
        // console.log(data,"data")
        const movieId = req.params.id
        const findMovie =  data.find(movie => movie.id === movieId)
        if(!findMovie){
            return res.status(404).json({message:"Movie not found"})
        }
        findMovie.title = title;
        findMovie.year = year
        fs.writeFileSync(dbPath,JSON.stringify(data))
        res.status(200).json({message:"Movie Update successfulyy"})

    }catch(error){
        res.status(500).json({message:'failed',error})
    }
})

module.exports = router