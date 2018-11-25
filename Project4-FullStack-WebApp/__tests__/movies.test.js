const request = require('supertest');
const app = require('../app');


describe('GET /api/users/:userId/favorites', function () {

  // Search movies by movieTitle
  it('Search movies by movieTitle - respond with 200 created', (done) => {
    request(app)
      .get(`/api/movies/search?movieTitle=Venom&sortOn=popularity&desc=true&page=1&limit=2`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Search movies by genreName
  it('Search movies by genreName - respond with 200 created', (done) => {
    request(app)
      .get(`/api/movies/search?genreName=action&sortOn=title&page=1&limit=2`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Search movie by id
  it('Search movies by existing movieId - respond with 200 created', (done) => {
    request(app)
      .get(`/api/movies/search?id=335983`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Search movie by false movieId
  it('Search movies by false movieId - respond with 500 created', (done) => {
    request(app)
      .get(`/api/movies/search?id=wrong`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Search movie without query params
  it('Search movies by false movieId - respond with 400 created', (done) => {
    request(app)
      .get(`/api/movies/search`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});