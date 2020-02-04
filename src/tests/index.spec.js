jest.mock('uuid', () => ({
  v4: () => '81d18e4a-45dd-4bcf-b79b-2abd8b932663'
}));

const app = require('../index');
const request = require('supertest');

describe('App', () => {
  it('fails to create post due to too short title', (done) => {
    request(app)
      .post('/posts')
      .send({
        title: '12345',
        content: 'some content that is longer then 20 chars'
      })
      .end((err, res) => {
        expect(res.body).toEqual({
          "status": "error",
          "statusCode": 409,
          "message": "Title shall be minimum 6 chars long"
        });
        done();
      })
  });

  it('fails to create post due to too short content', (done) => {
    request(app)
      .post('/posts')
      .send({
        title: 'some title',
        content: 'too short content'
      })
      .end((err, res) => {
        expect(res.body).toEqual({
          "status": "error",
          "statusCode": 409,
          "message": "Content shall be minimum 20 chars long"
        });
        done();
      })
  });  

  it('creates post', (done) => {
    request(app)
      .post('/posts')
      .send({
        title: 'some title',
        content: 'some content that is longer then 20 chars'
      })
      .end((err, res) => {
        expect(res.body).toEqual({
          message: 'Post created',
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            title: 'some title',
            content: 'some content that is longer then 20 chars'
          }
        });
        done();
      })
  });

  it('gets post', (done) => {
    request(app)
      .get('/posts/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .end((err, res) => {
        expect(res.body).toEqual({
          payload: {
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            title: 'some title',
            content: 'some content that is longer then 20 chars'
          }
        });
        done();
      })
  });

  it('gets posts', (done) => {
    request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res.body).toEqual({
          payload: [{
            id: '81d18e4a-45dd-4bcf-b79b-2abd8b932663',
            title: 'some title',
            content: 'some content that is longer then 20 chars'
          }]
        });
        done();
      })
  });

  it('remove post', (done) => {
    const server = request(app);
    server
      .delete('/posts/81d18e4a-45dd-4bcf-b79b-2abd8b932663')
      .expect(204)
      .end(() => {
        server
          .get('/posts')
          .end((err, res) => {
            expect(res.body.payload.length).toBe(0);
            done();
          });
      })
  })
});