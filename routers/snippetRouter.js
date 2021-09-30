const router = require("express").Router();
const Snippet = require("./../models/snippetModel");

router.get("/", async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ errorMessage: "Title and Description are required fields." });
    }

    const newSnippet = new Snippet({ title, description, date });
    const savedSnippet = await newSnippet.save();
    res.json(savedSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ errorMessage: "Snippet ID not given." });
    }

    const existingSnippet = await Snippet.findById(id);
    if (!existingSnippet) {
      return res
        .status(400)
        .json({ errorMessage: "Snippet Not Found with this ID." });
    }

    await existingSnippet.delete();
    res.json(existingSnippet);
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const id = req.params.id;
    
    if (!title || !description) {
      return res
        .status(400)
        .json({ errorMessage: "Title and Description are required fields." });
    }

    if (!id) {
      return res.status(400).json({ errorMessage: "Snippet ID not given." });
    }

    const originalSnippet = await Snippet.findById(id);
    if (!originalSnippet) {
      return res
        .status(400)
        .json({ errorMessage: "Snippet Not Found with this ID." });
    }

    originalSnippet.title = title;
    originalSnippet.description = description;
    originalSnippet.date = date;
    const savedSnippet = await originalSnippet.save();
    res.json(savedSnippet);

  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
