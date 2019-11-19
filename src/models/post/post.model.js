const { v4 } = require('uuid');
const { handleError, ErrorHandler } = require('../../helpers/error');

class Post {
  constructor(id, title, content) {
    this._id = id;
    this._title = title;
    this._content = content;
  }

  static validatePost(post) {
      const { title, content } = post
      if (!title || !content) {
        throw new ErrorHandler(409, 'Missing required title or content field(s)')
      }
      if (title.length < 6) {
        throw new ErrorHandler(409, 'Title shall be minimum 6 chars long')
      }
      if (content.length < 20) {
        throw new ErrorHandler(409, 'Content shall be minimum 20 chars long')
      }          
      return new this(v4(), title, content);
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get content() {
    return this._content;
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      content: this._content
    }
  }
}

module.exports = Post;