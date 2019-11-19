var express = require('express'),
    router = express.Router();

const { addPost, getPostById, removePost, getPosts } = require('../models/post/post.actions');
const Post = require('../models/post/post.model');

router
  // Add a binding to handle '/posts'
  .get('/', function (req, res) {
    getPosts()
      .then((posts) => {
        res
          .status(201)
          .json({
            payload: posts
          })
        })
      .catch(error => next(error))
    })
  .post('/', function (req, res, next) {
      addPost(Post.validatePost(req.body))
      .then(post => {
          res
            .status(201)
            .json({
                message: 'Post created',
                payload: post.toJSON()
            })
      })
      .catch(error => next(error))
    })
  .get('/:postId', function (req, res, next) {
    getPostById(req.params.postId)
      .then((post) => {
        res
          .status(200)
          .json({
            payload: post.toJSON()
          })
      })
      .catch(error => next(error))
  })    
  .delete('/:postId', function (req, res, next) {
    removePost(req.params.postId)
      .then(() => {
        res
          .status(204)
          .json({})
      })
      .catch(error => next(error))
  })

module.exports = router;