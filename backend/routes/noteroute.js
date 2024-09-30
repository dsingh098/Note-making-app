const express = require('express');
const router = express.Router();
const Note = require('../models/note.models.js');

// Create a new note
router.post("/notes", async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = new Note({ title, content });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all notes
router.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a note by title
router.put("/notes/title/:title", async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.findOneAndUpdate({ title: req.params.title }, { title, content }, { new: true });
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a note by title
router.delete("/notes/title/:title", async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ title: req.params.title });
        if (note) {
            res.json({ message: "Note deleted" });
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a note by title
router.get('/notes/title/:title', async (req, res) => {
    try {
        const note = await Note.findOne({ title: req.params.title });
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
