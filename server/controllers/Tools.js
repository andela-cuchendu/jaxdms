const bcrypt = require('bcryptjs');
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
    const ExtractedUser = jwt.decode(token, {
      complete: true,
    });
    return ExtractedUser.payload;
  },
  /**
   * -DeleteUserKeys -deletes unwanted User keys and
   * return the user
   *
   * @param {object} User - user object
   * @param {number}  - typeNumber type of delete
   * @return{object} - Updated User Object
   */
  DeleteUserKeys: (user, typeNumber) => {
    const newUser = user;
    switch (typeNumber) {
      case 1:
        delete newUser.password;
        delete newUser.updatedAt;
        return newUser;
      case 2:
        delete newUser.password;
        delete newUser.loggedin;
        delete newUser.updatedAt;
        return newUser;
      default:
        delete newUser.password;
        delete newUser.loggedin;
        delete newUser.createdAt;
        delete newUser.updatedAt;
        return newUser;

    }
  },
  /**
   * -NotFoundResponse -sends out message with response object
   *
   * @param {object} res - Response object
   * @param {string} message - Response message
   */
  NotFoundResponse: (res, message) => {
    res.status(404).send({
      message,
    });
  },
  Error: CustomError,
  ComparePassword: (password, compare) => bcrypt.compareSync(password, compare),
};
