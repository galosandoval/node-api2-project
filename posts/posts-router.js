const express = require("express");
const router = express.Router();
const Posts = require("../data/db");
const { findById, findPostComments, remove, update } = require("../data/db");

// GET
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
  console.log(id);
  findById(id).then((post) => {
    if (!post) {
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." })
        .end();
    } else if (post) {
      res.status(200).json(post);
    } else {
      res.status(500).json({
        message:
          '{ errorMessage: "The user information could not be retrieved." }',
      });
    }
  });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Posts.findCommentById(id).then((post) => {
    if (post.length === 0) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      // Posts.findCommentById(id).then((comments) =>
      res.status(201).json({ comments });
      // );
    }
  });
});

console.log(Posts);

// POST

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

router.post("/:id/comments", (req, res) => {
  const id = Number(req.params.id);
  findPostComments(id);
});

// DELETE

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  remove(id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.json({ message: "Post successfuly deleted" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "The post could not be removed" }).end();
    });
});

// PUT

// router.put("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   update(id)
//     .then((post) => {
//       if (!req.body.title || !req.body.contents) {
//         res
//           .status(400)
//           .json({
//             errorMessage: "Please provide title and contents for the post.",
//           })
//           .end();
//       } else if (!post) {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       } else {
//         res.status(200).json(post);
//       }
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "The post information could not be modified." })
//         .end();
//     });
// });
router.put('/:id', (req, res) => {
  const { title, contents } = req.body
  const id = Number(req.params.id)

  if (!title || !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
  } else {
    Posts.update(id, req.body)
    .then(update => {
      if (!update) {
        res.status(404).json({ errorMessage: "The post with the specified ID does not exist." })
      } else {
        Posts.findById(req.params.id) 
        .then(post => {
          res.status(201).json(post)
        })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The information could not be retrieved"})
    })
  }
})
module.exports = router;
