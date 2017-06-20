/* eslint-disable global-require */
import expect from 'expect';
import enzymify from 'expect-enzyme';

describe('Search API Spec: ', () => {
  const api = require('../server').api;
  const request = require('supertest')(api);
  const Users = require('../models').Users;
  expect.extend(enzymify());
  let token;
  let id;
  let DocId;
  const user = {
    username: 'uname3',
    firstname: 'fname3',
    lastname: 'lname3',
    email: 'email3@email.com',
    password: 'password123',
    loggedin: true,
    role: 3,
  };

  after(() => {
    Users.truncate({
      cascade: true,
    });
  });

  describe('App Api', () => {
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
          role: 3,
        })
        .end((err, res) => {
          request.post('/api/users/login')
            .set('x-access-token', null)
            .set('Accept', 'application/json')
            .send({
              username: 'chibujax',
              password: 'password123',
            })
            .end((err, res) => {
              token = res.body.token;
              id = res.body.userData;
              done();
            });
        });
    });

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

  });


  describe('Search Api', () => {

    it('should search for documents', (done) => {
      request.get('/api/search/documents?q=doc')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body[0].title).toEqual('doc title');
          expect(res.body.length).toBe(1);
          done();
        });
    });

    it('should search for documents that dont exist', (done) => {
      request.get('/api/search/documents?q=bebebe')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.length).toBe(0);
          done();
        });
    });    

    it('should search for users', (done) => {
      request.get('/api/search/users?q=chibu')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body[0].username).toEqual('chibujax');
          expect(res.body.length).toBe(1);
          done();
        });
    });   

    it('should search for users that dont exist', (done) => {
      request.get('/api/search/users?q=andela')
        .set('x-access-token', token)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.length).toBe(0);
          done();
        });
    });     

  });
});
