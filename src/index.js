var Post = require('./models/post/post.model');
var express = require('express');

const port = 3000;

const app = express();
app.use(express.json());

var posts = [];

app.listen(port, () => console.log(`TSH app listening on port ${port}! api@ http://localhost:3000/`));

var addPost = function(post) {
  posts.push(post);

  return Promise.resolve(post)
};

var getPostById = function(postId) {
  var post = posts.find(post => post.id === postId);

  if (!post) {
    return Promise.reject('Error occurred');
  }

  return Promise.resolve(post);
};

var removePost = function(postId) {
  var postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex < 0) {
    return Promise.reject('Error occurred');
  }

  posts = posts.filter(post => post.id !== postId);

  return Promise.resolve();
};

var getPosts = function() {
  return Promise.resolve(posts);
};

app.post('/posts', function(req, res) {
  addPost(Post.fromRequestBody(req.body))
    .then(post => {
      res
        .status(201)
        .json({
          message: 'Post created',
          payload: post.toJSON()
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({ error });
    })
});

app.get('/posts', function(req, res) {
  getPosts()
    .then((posts) => {
      res
        .status(201)
        .json({
          payload: posts
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({ error });
    })
});

app.get('/posts/:postId', function(req, res) {
  getPostById(req.params.postId)
    .then((post) => {
      res
        .status(200)
        .json({
          payload: post.toJSON()
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({ error });
    })
});

app.delete('/posts/:postId', function(req, res) {
  removePost(req.params.postId)
    .then(() => {
      res
        .status(204)
        .json({
          message: 'Post removed'
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({ error });
    })
});

app.use(function (req, res) {
  res
    .status(404)
    .json("Page Not Found");
});


module.exports = app;