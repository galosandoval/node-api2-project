const express = require("express");
const router = express.Router();
const Posts = require("../data/db");

router.get("/", (req, res) => {
  Posts.find(query)
    .then((posts) => {
      res.status(200).json({ data: posts });
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
