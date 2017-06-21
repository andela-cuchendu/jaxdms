const ExtractUser = require('./Tools').ExtractUser;
const jwt = require('jsonwebtoken');

  /**
   * Verify user by checking for token and logged in
   * before perfomring any operation on dicument
   *
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   */
const verifyDoc = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];
  if (token) {
    const user = ExtractUser(token);
    if (!user.loggedin) {
      res.status(401).json({
        error: 'Unauthorized Access.'
      });
    } else {
      jwt.verify(token, req.app.get('superSecret'), (err, parcel) => {
        if (err) {
          res.status(401).json({
            error: 'Authentication Failed'
          });
        } else {
          req.parcel = parcel;
          req.parcel.password = null;
          next();
        }
      });
    }
  } else {
    res.status(403).send({
      error: 'No token found.'
    });
  }
};

  /**
   * Verify user by checking for token and logged in
   *
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject} - json Object
   */
const verifyUser = (req, res, next) => {
  // Check for the token from the header or from the request body
  const token = req.body.token || req.headers['x-access-token'];

  if (token) {
    let user = ExtractUser(token);
    if (!user.loggedin) {
      res.status(401).json({
        error: 'Unauthorized Access. Please login first'
      });
    } else {
      // Check authenticity of the token
      jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
        if (err) {
          res.status(401).json({
            error: 'Failed to authenticate token.'
          });
        } else {
          decoded.password = null;
          req.decoded = decoded;
          next();
        }
      });
    }

  } else {
    // No token found
    res.status(403).send({
      error: 'No token provided.'
    });
  }
};

export default {
  verifyUser,
  verifyDoc,
};
