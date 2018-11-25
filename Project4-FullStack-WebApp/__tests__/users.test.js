const request = require('supertest');
const app = require('../app');

let body1 = {
  email: "jest@gmail.com",
  password: "test123"
};

let body2 = {
  movieId: 335983,
  isDelete: false
};

let existingUserId = "5be836c35d25f22a70b04976";


describe('POST /api/users/signup', function () {

  // First signup new user
  it('Sign up new user - respond with 201 created', function (done) {
    request(app)
      .post('/api/users/signup')
      .send(body1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then try signup the same user
  it('Sign up same user - respond with 409 created', function (done) {
    request(app)
      .post('/api/users/signup')
      .send(body1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then try adding with empty body
  it('Sign up empty body - respond with 400 created', function (done) {
    request(app)
      .post('/api/users/signup')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

});

describe('POST /api/users/signin', function () {

  //Sign in the user made earlier
  it('Sign in same User - respond with 200 created', function (done) {
    request(app)
      .post('/api/users/signin')
      .send(body1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then sign in with empty body
  it('Sign in empty body - respond with 400 created', function (done) {
    request(app)
      .post('/api/users/signin')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then sign in with wrong password
  it('Sign in wrong password - respond with 400 created', function (done) {
    request(app)
      .post('/api/users/signin')
      .send({
        ...body1,
        password: "wrongpassword"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then sign in with wrong email
  it('Sign in wrong email - respond with 400 created', function (done) {
    request(app)
      .post('/api/users/signin')
      .send({
        ...body1,
        email: "wrongemail@gmail.com"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /api/users', () => {

  // First get all users
  it('Get all users - respond with 200 created', (done) => {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then get user by email
  it('Get user by email - respond with 200 created', (done) => {
    request(app)
      .get('/api/users?email=test@gmail.com')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then try getting user with false email
  it('Get user by wrong email - respond with 400 created', (done) => {
    request(app)
      .get('/api/users?email=wrongemail@gmail.com')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Then delete the user made earlier
  it('Delete user made earlier - respond with 200 created', (done) => {
    request(app)
      .get(`/api/users?email=${body1.email}&deleteUser=true`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

});

describe('GET /api/users/:userId/favorites', function () {

  // Get movies for existing user
  it('Get two first movies - respond with 200 created', (done) => {
    request(app)
      .get(`/api/users/${existingUserId}/favorites?page=1&limit=2`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Wrong userId
  it('Get two first movies with wrong userId - respond with 500 created', (done) => {
    request(app)
      .get(`/api/users/wrongUserId/favorites?page=1&limit=2`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  // Missing query params
  it('Get two first movies without query variables - respond with 400 created', (done) => {
    request(app)
      .get(`/api/users/${existingUserId}/favorites`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

});


describe('POST /api/users/:userId/favorites', function () {


  //First add movieId to users favorites
  it('Add movie to favorites - respond with 200 created', function (done) {
    request(app)
      .post(`/api/users/${existingUserId}/favorites`)
      .send(body2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  //Then remove movieId from users favoirtes
  it('Delete movie from favorites - respond with 200 created', function (done) {
    request(app)
      .post(`/api/users/${existingUserId}/favorites`)
      .send({
        ...body2,
        isDelete: true
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  //Then try without body
  it('Post without body - respond with 400 created', function (done) {
    request(app)
      .post(`/api/users/${existingUserId}/favorites`)
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  //Then with false userId
  it('Post with false userId - respond with 500 created', function (done) {
    request(app)
      .post(`/api/users/wrong/favorites`)
      .send(body2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

});

