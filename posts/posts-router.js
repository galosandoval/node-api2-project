const express = require("express");
const router = express.Router();
const Posts = require("../data/db");

router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      console.log(posts);
      res.status(200).json( posts );
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
  const id = req.params.id
  Posts.findById()
    .then((posts) => {
      console.log(posts);
      res.status(200).json({ posts });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." })
        .end();
    });
});

console.log(Posts);

router.post("/", (req, res) => {
  console.log(req.body)
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({
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
