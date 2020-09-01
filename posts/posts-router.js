const express = require("express");
const router = express.Router();
const Posts = require("../data/seeds/01-posts");

router.get("/", (req, res) => {
  const query = req.query;
  console.log(query);

  Posts.find(query)
    .then((posts) => {
      res.status(200).json({ query: req.query, data: posts });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." })
        .end();
    });
});

module.exports = router;
