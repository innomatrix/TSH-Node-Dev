jest.mock('uuid', () => ({
  v4: () => '81d18e4a-45dd-4bcf-b79b-2abd8b932663'
}));

const Post = require('../models/post/post.model');

describe('Post model', () => {
  it('creates post from request', () => {
    const requestBody = {
      title: 'some title',
      content: 'some content that is longer then 20 chars'
    };

    expect(Post.validatePost(requestBody).toJSON()).toEqual({
      id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
      title: 'some title',
      content: 'some content that is longer then 20 chars'
    })
  })
});

describe('Post model', () => {
  it('fails creates post due to too short title', () => {
    const requestBody = {
      title: '1234',
      content: 'some content that is longer then 20 chars'
    };
    try {
      Post.validatePost(requestBody)
    } catch (error) {
      expect(error.message).toBe("Title shall be minimum 6 chars long")
    }
  })
});