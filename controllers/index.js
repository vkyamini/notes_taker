const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require('uuid');

// Acess the data from db.json(as database)
const notes = require("../db/db.json");
const router = express.Router();

// gets the initial index.html file
router.get("/",(request,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
 });
 
// from UI on click directs to node.html file
router.get("/notes",(request,res)=>{
   res.sendFile(path.join(__dirname,"../public/notes.html"))
});

// is getting the entry from json file to display
router.get("/api/notes", (request,res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        // convert to json
        const notesArray = JSON.parse(data);
        res.json(notesArray);
    });
});

// /api/notes had GET method in UI for fetching the data from html
router.post("/api/notes", (req,res) => {
    const note = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    };
    
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        // convert to json
        const notesArray = JSON.parse(data);
        notesArray.push(note);

        fs.writeFile("./db/db.json",JSON.stringify(notesArray,null,4),(err)=>{
            if (err){
                return res.status(500).json({msg:"error writing db"})
            } else {
                return res.json(notesArray);
            }
           })
    });
});

router.get('/api/notes/:id', function(req, res) {
    res.json(notes[req.params.id]);
})

router.delete('/api/notes/:id', function(req, res) {
    notes.splice(req.params.id, 1);
    updateNotes(notes);
    res.json(notes);
})

function updateNotes(notes) {
    fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), function(err) {
        if (err) throw err;
        return true;
    })}

module.exports = router;