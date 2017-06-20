/* eslint-disable global-require */
import * as Tools from '../controllers/Tools';

describe('Tools: ', () => {
  const expect = require('expect');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  let token;
  const AppSecret = 'thisisoursecret';
  const TokenUser = {
    id: 5,
    role: 3,
    loggedin: true,
  };

  let HasshedPassword;
  const NormalPassword = 'password1234';

  before(() => {
    HasshedPassword = bcrypt.hashSync(NormalPassword, 10);
    token = jwt.sign(TokenUser, AppSecret, {
      expiresIn: 43200,
    });
  });
  describe('Controller Tools', () => {

    it('should extract user', (done) => {
      const HashPassword = Tools.ExtractUser(token);
      expect(HashPassword.role).toBe(3);
      expect(HashPassword.loggedin).toBe(true);
      done();
    });

    it('should create error', (done) => {
      const err = new Error(
        'title and content fields are mandatory'
      );
      err.status = 400;
      expect(err.status).toBe(400);
      expect(err.message).toEqual('title and content fields are mandatory');
      done();
    });

    it('should extract user', (done) => {
      const HashPassword = Tools.ExtractUser(token);
      expect(HashPassword.role).toBe(3);
      expect(HashPassword.loggedin).toBe(true);
      done();
    });

    it('should compare password', (done) => {
      const pwd = Tools.ComparePassword(NormalPassword, HasshedPassword);
      const wrongPwd = Tools.ComparePassword('Wrong', HasshedPassword);
      expect(pwd).toBe(true);
      expect(wrongPwd).toBe(false);
      done();
    });

  });
});
