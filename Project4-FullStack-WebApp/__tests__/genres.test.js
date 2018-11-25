const request = require('supertest');
const app = require('../app');


describe('GET /api/users/:userId/favorites', function () {

  // First test search by id
  it('Search genre by id - respond with 200 created', (done) => {
    request(app)
      .get(`/api/genres/search?id=28`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Search with false id
  it('Search genre by false id - respond with 500 created', (done) => {
    request(app)
      .get(`/api/genres/search?id=wrong`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then test search by genreName
  it('Search genre by genreName - respond with 200 created', (done) => {
    request(app)
      .get(`/api/genres/search?genreName=action`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Missing query parameters
  it('Search with no query params - respond with 400 created', (done) => {
    request(app)
      .get(`/api/genres/search`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});