const {Router} = require('express');
const NoteModel = require('../Models/note.model');

const notesController = Router();

notesController.get("/", async(req, res)=>{
    const notes = await NoteModel.find({userId: req.body.userId})
    res.send(notes)
});

notesController.post("/create", async(req, res)=>{
    const {Heading, Note, Tag, userId} = req.body;
    const note = new NoteModel({
        Heading, 
        Note,
        Tag,
        userId
    })
    try{
        await note.save();
        res.send("note created")
    }catch(err){
        res.send('something went wrong')
    }
});

module.exports = notesController