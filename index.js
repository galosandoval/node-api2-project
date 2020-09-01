const express = require('express')
const server = express()
const shortid = require('shortid')

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

