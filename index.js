const express = require('express')
const server = express()
const shortid = require('shortid')

const Posts = require('./data/seeds/01-posts')
const postsRouter = require('./posts/posts-router')
const commentsRouter = require('./comments/comments-router')

const blogPosts = [
  {
    title: "The post title", // String, required
    contents: "The post contents", // String, required
    created_at: 'Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)', // Date, defaults to current date
    updated_at: 'Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)' // Date, defaults to current date
  }
]

const comment = [
  {
    text: "The text of the comment", // String, required
    post_id: shortid.generate(), // Integer, required, must match the id of a post entry in the database
    created_at: 'Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)', // Date, defaults to current date
    updated_at: 'Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)' // Date, defaults to current date
  }
]

server.use('/api/posts', postsRouter)
// server.use('/api/posts/:id/comments', commentsRouter)

server.get('/', (req, res) => {
  res.status(200).json({message: 'Successfully used GET'})
})

const port = 8000
server.listen(port, () => console.log('Listening on Port 8000'))