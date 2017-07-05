/* eslint-disable global-require */
import expect from 'expect';
import enzymify from 'expect-enzyme';

describe('Users API Spec: ', () => {
  const api = require('../server').api;
  const request = require('supertest')(api);
  expect.extend(enzymify());
  let token;
  let id;

  describe('Users Api', () => {
    it('should be able to create a user and return token', (done) => {
      request.post('/api/users')
        .set('x-access-token', null)
        .set('Accept', 'application/json')
        .send({
          username: 'chibujax',
          firstname: 'kakashi',
          lastname: 'mightguy',
          email: 'fantasy@movies.com',
          password: 'password123',
          role: 3,
        })
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
          expect(err).toBe(null);
          expect(res.body.newUser.username).toEqual('chibujax');
          expect(res.body.token).toExist();
          id = res.body.newUser.id;
          done();
        });
    });

    it('should be able to login user', (done) => {
      request.post('/api/users/login')
        .set('x-access-token', null)
        .set('Accept', 'application/json')
        .send({
          username: 'chibujax',
          password: 'password123',
        })
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.token).toExist();
          token = res.body.token;
          done();
        });
    });

    it('should return all users', (done) => {
      request.get('/api/users')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.rows[0].username).toEqual('chibujax');
          done();
        });
    });

    it('should verify that user is logged in', (done) => {
      request.get('/api/users/data/data')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.username).toEqual('chibujax');
          done();
        });
    });

    it('should get user with id', (done) => {
      request.get(`/api/users/${id}`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.username).toEqual('chibujax');
          done();
        });
    });

    it('should be able to login user', (done) => {
      request.put(`/api/users/${id}`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .send({
          firstname: 'brazil',
        })
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.firstname).toEqual('brazil');
          done();
        });
    });

    it('should be able to list documents', (done) => {
      request.get(`/api/users/${id}/documents`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.length).toEqual(0);
          done();
        });
    });

    it('should be able logout', (done) => {
      request.post('/api/users/logout')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.message).toEqual('Successfully logged out');
          done();
        });
    });

    it('should be able to delete user', (done) => {
      request.post('/api/users/login')
        .set('x-access-token', null)
        .set('Accept', 'application/json')
        .send({
          username: 'chibujax',
          password: 'password123',
        })
        .end(() => {
        });
      request.delete(`/api/users/${id}`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(204);
          expect(err).toBe(null);
          done();
        });
    });
  });
});
