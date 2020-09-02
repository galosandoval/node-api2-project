const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
const { findById } = require("../data/db");

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." })
        .end();
    });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  findById(id).then((post) => {
    if (!post) {
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." })
        .end();
    }
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(500).json({
        message:
          '{ errorMessage: "The user information could not be retrieved." }',
      });
    }
  });
});

console.log(Posts);

router.post("/", (req, res) => {
  console.log(req.body);
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else if (req.body.title && req.body.contents) {
    Posts.insert(req.body);
    res.status(201).json(req.body);
  } else {
    res.status(500).json({
      error: "There was an error while saving the post to the database",
    });
  }
});

module.exports = router;
