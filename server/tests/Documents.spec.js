/* eslint-disable global-require */
import expect from 'expect';
import enzymify from 'expect-enzyme';

describe('Document API Spec: ', () => {
  const api = require('../server').api;
  const request = require('supertest')(api);
  const Users = require('../models').Users;
  expect.extend(enzymify());
  let token;
  let id;
  let DocId;

  after(() => {
    Users.truncate({
      cascade: true,
    });
  });

  describe('Document Api', () => {
    it('should verify authentication before doc creation', (done) => {
      request.post('/api/documents')
        .set('Accept', 'application/json')
        .send({
          title: 'doc title',
          content: 'Doc content',
          creator: 'Chibujax',
          access: 3,
          userid: 45,
        })
        .end((err, res) => {
          expect(res.statusCode).toBe(403);
          expect(res.body.error).toEqual('No token found.');
          done();
        });
    });

    it('should create and login user', (done) => {
      request.post('/api/users')
        .set('x-access-token', null)
        .set('Accept', 'application/json')
        .send({
          username: 'chibujax',
          firstname: 'kakashi',
          lastname: 'mightguy',
          email: 'fantasy@movies.com',
          password: 'password123',
          loggedin: true,
          role: 3,
        })
        .end(() => {
          request.post('/api/users/login')
            .set('x-access-token', null)
            .set('Accept', 'application/json')
            .send({
              username: 'chibujax',
              password: 'password123',
            })
            .end((err, response) => {
              token = response.body.token;
              id = response.body.userData.id;
              done();
            });
        });
    });
  });


  describe('Document Api', () => {
    it('should be able to create a document and return id', (done) => {
      request.post('/api/documents')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .send({
          title: 'doc title',
          content: 'Doc content',
          creator: 'Chibujax',
          access: 3,
          userid: id,
        })
        .end((err, res) => {
          expect(res.statusCode).toBe(201);
          expect(err).toBe(null);
          expect(res.body.title).toEqual('doc title');
          DocId = res.body.id;
          done();
        });
    });

    it('should return all users documents', (done) => {
      request.get('/api/documents')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.documents[0].title).toEqual('doc title');
          expect(res.body.documents.length).toBe(1);
          done();
        });
    });

    it('should update document', (done) => {
      request.put(`/api/documents/${DocId}`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .send({
          title: 'changed title',
          content: 'changed Doc content',
        })
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.title).toEqual('changed title');
          expect(res.body.content).toEqual('changed Doc content');
          done();
        });
    });

    it('should get a document with ID', (done) => {
      request.get(`/api/documents/${DocId}`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.title).toEqual('changed title');
          expect(res.body.content).toEqual('changed Doc content');
          done();
        });
    });

    it('should get public type of document with ID', (done) => {
      request.get(`/api/documents/${DocId}`)
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.length).toEqual();
          done();
        });
    });

    it('should be able to delete user', (done) => {
      request.delete(`/api/documents/${DocId}`)
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
