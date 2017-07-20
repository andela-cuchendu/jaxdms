/* eslint-disable global-require */
describe('App API Spec ', () => {
  const api = require('../server').api;
  const request = require('supertest')(api);
  const expect = require('expect');

  describe('App wide API', () => {
    it('should handle not found', (done) => {
      request.get('/api/what-are-you')
        .set('x-access-token', null)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          done();
        });
    });

    it('should handle not found outside api', (done) => {
      request.get('/what-are-you')
        .set('x-access-token', null)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          done();
        });
    });
  });
});
