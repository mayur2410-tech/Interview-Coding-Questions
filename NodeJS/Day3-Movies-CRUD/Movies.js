const express = require('express')
const fs = require("fs");
const path = require("path")
 const router = express.Router();

const dbPath = path.join(__dirname,'./Movies.json');

router.get('/get/movies',(req,res)=>{
    try{
          const movie = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
    return res.status(200).json({message:"success",movie});
    }catch(error){
        return res.status(500).json({message:"failed to read",error})
    }
  
})

router.post('/movies', (req, res) => {
    try{
        const movies = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
        const { id, title, year } = req.body;
        if(!title|| !year  ||!id){
            return res.status(400).json({message:"All fields are required"});
        }
        if(typeof title!="string" || typeof year!='number'){
            return res.status(400).json({message:"Title and year should be in string and number"});
        }
    

    const newMovies = { id, title, year };

   movies.push(newMovies)

    fs.writeFileSync(dbPath, JSON.stringify(movies));

    return res.status(201).json({message:"movei added succesfully"});

    }catch(error){
        return res.status(500).json({message:"eroor ",error})
    }
    
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