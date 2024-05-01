const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const bodyParser = require("body-parser");
 router.use(bodyParser.json());

// Route : 1 : Get all the notes using : using GeT "/api/auth/fetchallnotes".login required.
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error occurred");
    }

})

// Route : 2 : Add a new note using : POST  "/api/notes/addnote".login required.
router.post('/addnote', fetchUser, [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('descryption', "Enter the descryption here").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, descryption, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, descryption, tag, user: req.user.id
        });
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error occurred");
    }
})

router.put('/updatenote/:id', fetchUser, async (req, res) => {
    // Extract data from request body
    const { title, descryption, tag } = req.body;

    // Create a new note object with extracted data
    const newNote = {};
    if (title) { newNote.title = title }
    if (descryption) { newNote.descryption = descryption }
    if (tag) { newNote.tag = tag }

    // Find a note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) { res.status(404).send("Not Found") }

    // Check if the user is authorized to update the note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
    }

    // Update the note with new data
    const noted = await Notes.findByIdAndUpdate({_id : req.params.id}, { $set: newNote}, { new: true});
    // Send updated note as responses
    res.json(noted);
}
);

router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") };
        // console.log({note})
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success ": "Note has been deleted" });
    }
    catch (error) {
        res.status(500).send("Internel Server error.")
    }
});

module.exports = router;