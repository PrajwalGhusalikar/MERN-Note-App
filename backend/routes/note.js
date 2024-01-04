const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/getuser");
const Notes = require("../models/notes");
const { body, validationResult } = require("express-validator");

//fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {

  const notes = await Notes.find({ user: req.user.id });
  
  res.json(notes);
});

//createnotes
router.post(
  "/createnotes",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 5 }),
    body("description", "enter vzlid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if any error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            success: false,
            errors: errors.array(),
            msg: errors.message,
          });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      return res.send({ success: true, notes: savedNote });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//update note

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(404).send("wrong user");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  return res.json({ note });
});

//delete note

router.delete("/deletenotes/:noteid", fetchuser, async (req, res) => {
  let note = await Notes.findById(req.params.noteid);
  if (!note) {
    return res.status(404).send("note not found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(404).send("wrong user");
  }
  note = await Notes.findByIdAndDelete(req.params.noteid);
  return res.json({ success: " note has been deleted", note: note });
});

module.exports = router;
