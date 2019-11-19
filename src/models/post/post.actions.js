var posts = [];

const { ErrorHandler } = require('../../helpers/error');

module.exports = {
    addPost: function (post) {
        posts.push(post);

        return Promise.resolve(post)
    },
    getPostById: function (postId) {
        var post = posts.find(post => post.id === postId);

        if (!post) {
            return Promise.reject(new ErrorHandler(409,"No such post!"));
        }

        return Promise.resolve(post);
    },
    removePost: function (postId) {
        var postIndex = posts.findIndex(post => post.id === postId);

        if (postIndex < 0) {
            return Promise.reject(new ErrorHandler(409, "No such post!"));
        }

        posts = posts.filter(post => post.id !== postId);

        return Promise.resolve(posts);
    },
    getPosts: function () {
        return Promise.resolve(posts);
    }
}