const ExtractUser = require('./Tools').ExtractUser;
const jwt = require('jsonwebtoken');

  /**
   * Verify user by checking for token and logged in
   * before perfomring any operation on dicument
   *
   * @param {object} req - Request Object from express
   * @param {object} res - Response Object from express
   * @param {object} next - Middleware
   */
const verifyDoc = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];
  if (token) {
    const user = ExtractUser(token);
    if (!user.loggedin) {
      res.status(401).json({
        error: 'Unauthorized Access.',
      });
    } else {
      jwt.verify(token, req.app.get('superSecret'), (err, parcel) => {
        if (err) {
          res.status(401).json({
            error: 'Authentication Failed',
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
      error: 'No token found.',
    });
  }
};

  /**
   * Verify user by checking for token and logged in
   *
   * @param {object} req - Request Object from express
   * @param {object} res - Response Object from express
   * @param {object} next - Middleware
   * @returns {responseObject} - json Object
   */
const verifyUser = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];

  if (token) {
    const user = ExtractUser(token);
    if (!user.loggedin) {
      res.status(401).json({
        error: 'Unauthorized Access. Please login first',
      });
    } else {
      jwt.verify(token, req.app.get('superSecret'), (err, decoded) => {
        if (err) {
          res.status(401).json({
            error: 'Failed to authenticate token.',
          });
        } else {
          const NEwDecoded = decoded;
          NEwDecoded.password = null;
          req.decoded = NEwDecoded;
          next();
        }
      });
    }
  } else {
    res.status(403).send({
      error: 'No token provided.',
    });
  }
};

export default {
  verifyUser,
  verifyDoc,
};
