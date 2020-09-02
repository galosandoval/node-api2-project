const express = require("express");

const Posts = require("./data/db");
const postsRouter = require("./posts/posts-router");
const server = express();


server.use(express.json());
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Successfully used GET" }).end();
});

const port = 8000;
server.listen(port, () => console.log("Listening on Port 8000"));
