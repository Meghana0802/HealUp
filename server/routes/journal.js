const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const JournalEntry = require("../models/JournalEntry");

// @route POST /api/journal
// @desc Add new journal entry
// @access Private
router.post("/", auth, async (req, res) => {
  console.log("POST request received at /api/journal");
  const { title, content } = req.body;
  try {
    const newEntry = new JournalEntry({
      user: req.user.id,
      title,
      content,
    });
    const entry = await newEntry.save();
    res.json(entry);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/journal
// @desc Get all journal entries for the authenticated user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/journal/:id
// @desc Update a journal entry
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    let entry = await JournalEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: "Journal entry not found" });

    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    entry = await JournalEntry.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/journal/:id
// @desc Delete a journal entry
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let entry = await JournalEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ msg: "Journal entry not found" });

    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await JournalEntry.findByIdAndDelete(req.params.id);
    res.json({ msg: "Journal entry removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
