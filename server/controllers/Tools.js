'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * Represents our custome error which extends error
 * @class CustomError
 * @extends {Error}
 */
class CustomError extends Error {
  /**
   * Creates an instance of CustomError.
   * @param {string} message 
   * @memberOf CustomError
   */
  constructor(message) {
    super(message);
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

// Extract user info from the token
module.exports = {
  /**
   * Takes a token and return user object
   * @param {string} token - Token to be extracted 
   * @return{object} - Extracted User Object
   */
  ExtractUser: (token) => {
    let ExtractedUser = jwt.decode(token, {
      complete: true
    });
    return ExtractedUser.payload;
  },
  Error: CustomError,
  ComparePassword: (password, compare) => {
    return bcrypt.compareSync(password, compare);
  },
  /**
   * Takes a password and return a hashed string
   * using bcrypt plugin
   * @param {string} password - password to be hashed 
   * @return{string} - hashed string
   */
  HashPassword: (password) => {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        return err;
      } else {
        password = hash;
      }
    });
  }
};