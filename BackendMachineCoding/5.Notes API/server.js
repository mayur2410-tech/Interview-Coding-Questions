const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
app.use(express.json())

const db = path.join(__dirname,'./db.json')


//get all notes
app.get('/notes',(req,res)=>{
    try{
        const notes = JSON.parse(fs.readFileSync(db, 'utf-8'))
                return res.status(200).json({message:"success",notes})

    }catch(error){
        return res.status(500).json({message:"failed to read file",error})
    }
})

//add notes
app.post('/notes',(req,res)=>{
    try{
        const notes = JSON.parse(fs.readFileSync(db,'utf-8'))
        const {id,title,content} = req.body
        if(!id || !title || !content){
            return res.status(400).json({message:"All fields are requires"})
        }

        const newNote = {
            id:id,
            title:title,
            content:content
        }
        notes.push(newNote)
        fs.writeFileSync(db,JSON.stringify(notes))
        return res.status(201).json({message:"note created succssfully",newNote})
    }catch(error){
   return res.status(500).json({message:"failed to read file",error})
    }
})


app.put('/notes/:id',(req,res)=>{
    try{
    const id = Number(req.params.id)
    const note = JSON.parse(fs.readFileSync(db,'utf-8'))
    const {title,content} = req.body
    const filterNote = note.find(note => note.id == id)
    if(!filterNote){
        return res.status(400).json({message:"Note not found"})
    }
    if(title) filterNote.title = title
    if(content) filterNote.content = content

    fs.writeFileSync(db,JSON.stringify(note))
            return res.status(200).json({message:"Note update successfully"})
    }catch(error){
           return res.status(500).json({message:"failed to read file",error})

    }
})

app.delete('/notes/:id',(req,res)=>{
    try{
        const noteId = Number(req.params.id)
        const note = JSON.parse(fs.readFileSync(db,'utf-8'))

        const deletNote = note.filter(n => n.id !== noteId)
        console.log(deletNote)
        if(note.length==deletNote.length){
            return res.status(404).json({message:"Note not found"})
        }
        fs.writeFileSync(db,JSON.stringify(deletNote))
        return res.status(200).json({message:"delete succesfully"})

    }catch(error){
        return res.status(500).json({message:"failed to read file",error})

    }
})

app.listen(3000,()=>{
    console.log("server is running")
})