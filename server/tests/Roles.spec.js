/* eslint-disable global-require */
describe('Roles API Spec ', () => {
  const api = require('../server').api;
  const request = require('supertest')(api);
  const Roles = require('../models').Roles;
  const expect = require('expect');

  beforeEach(() => {
    const roles = {
      title: 'Admin',
      access: 3,
    };
    return Roles.create(roles);
  });

  afterEach(() => {
    Roles.destroy({
      where: {},
      truncate: true,
    });
  });

  describe('Get All Roles', () => {
    it('should return all roles', (done) => {
      request.get('/api/roles')
        .set('x-access-token', null)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBe(null);
          expect(res.body.length).toBe(1);
          expect(res.body[0].title).toEqual('Admin');
          done();
        });
    });
  });
});
