const Users = require('../models').Users;
const Documents = require('../models').Documents;
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const ExtractUser = require('./Tools').ExtractUser;
const Error = require('./Tools').Error;
const ComparePassword = require('./Tools').ComparePassword;

/**
 * Represents The User activities
 */
module.exports = {
  /**
   * Create new User
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject}
   */
  create(req, res, next) {
    const required = ['username', 'firstname',
      'lastname', 'email', 'password'
    ];
    if (!required.every(field => field in req.body)) {
      const err = new Error(
        'All fields are mandatory'
      );
      err.status = 400;
      next(err);
    } else {
      if (!req.body.role) {
        req.body.role = 1;
      }
      return Users
        .create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          role: req.body.role,
          loggedin: true
        })
        .then((user) => {
          let TokenUser = _.pick(user, 'id', 'role', 'loggedin');
          const AppSecret = req.app.get('superSecret');
          let token = jwt.sign(TokenUser, AppSecret, {
            expiresIn: 43200
          });
          user.password = null;
          res.status(201).json({
            user: user,
            token: token
          });
        })
        .catch((err) => {
          if (err.name === 'SequelizeUniqueConstraintError') {
            err.status = 500;
            err.message = err.original.message;
          }
          next(err);
        });
    }
  },

  /**
   * List all users. This can be done only by Admin
   * It also checks if there is limit or offset query
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @returns {jsonObject} - This maybe error json Object 
   */
  list(req, res) {
    if (req.decoded.role !== 3) {
      res.status(403).json({
        error: 'Unauthorized Access'
      });
    } else {
      let QueryOption = {
        limit: 0,
        offset: 0
      };
      QueryOption.offset = parseInt(req.query.offset, 10) || 0;
      QueryOption.limit = parseInt(req.query.limit, 10) || 0;
      if (QueryOption.offset < 1) {
        delete QueryOption.offset;
      }
      if (QueryOption.limit < 1) {
        delete QueryOption.limit;
      }
      return Users
        .findAll(QueryOption)
        .then(Users => res.status(200).send(Users))
        .catch(error => res.status(400).send(error));
    }
  },

  /**
   * Gets a user with ID. Only the account owner
   * or the admin can perfom this action.
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   */
  GetUser(req, res) {
    if (req.decoded.id.toString() === req.params.id ||
      req.decoded.role === 3) {
      if (req.params.id == null) {
        return res.status(404).send({
          message: 'No ID found'
        });
      } else {
        return Users
          .findById(req.params.id)
          .then(User => {
            if (!User) {
              return res.status(404).send({
                message: 'User Not Found'
              });
            }
            User.password = null;
            return res.status(200).send(User);
          })
          .catch(error => res.status(400).send(error));
      }
    } else {
      res.status(403).json({
        error: 'Unauthorized Access'
      });
    }
  },
  /**
   * Deletes a User specified in the ID param.
   * This can only be done by the Admin
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject}
   */
  DeleteUser(req, res, next) {
    if (req.decoded._id === req.params.id ||
      req.decoded.role.title === 'admin') {
      Users.findOneAndRemove({
          _id: req.params.id
        })
        .exec()
        .then(() => {
          res.sendStatus(204);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      res.status(403).json({
        error: 'Unauthorized Access'
      });
    }
  },

  /**
   * Updates user using the ID and parameters 
   * provided. Also check for token and logged in
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @returns 
   */
  UpdateUser(req, res) {
    if (req.decoded.id.toString() === req.params.id ||
      req.decoded.role === 3) {

      return Users
        .findById(req.params.id)
        .then(User => {
          if (!User) {
            return res.status(404).send({
              message: 'User Not Found'
            });
          } else {
            delete req.body.email;
            delete req.body.username;
            if (req.decoded.id != 3 && ('role' in req.body)) {
              delete req.body.role;
            }
            return User
              .update(req.body, {
                fields: Object.keys(req.body)
              })
              .then(() => {
                User.password = null;
                return res.status(200).send(User);
              })
              .catch((error) => res.status(400).send(error));
          }

        })
        .catch((error) => res.status(400).send(error));

    } else {
      res.status(403).json({
        error: 'Unauthorized Access'
      });
    }
  },
  /**
   * Login a user and retrun a token for the user
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject}
   */
  login(req, res, next) {
    Users.find({
        where: {
          username: req.body.username
        }
      })
      .then((User) => {
        let ValidPassword = null;
        let err;
        if (!User) {
          err = new Error('Authentication failed. Invalid login.');
          err.status = 404;
          throw err;
          else if (User) {
            try {
              ValidPassword = ComparePassword(req.body.password, User.password);
            } catch (e) {
              let err;
              err = new Error(e);
              err.status = 404;
              throw err;
            }
          }
        } else if (!ValidPassword) {
          err = new Error('Authentication failed. Invalid login.');
          err.status = 401;
          throw err;
        } else {
          return User
            .update({
              loggedin: true
            })
            .then((User) => {
              User.password = null;
              let UserToken = {
                id: User.id,
                role: User.role,
                loggedin: User.loggedin
              };
              let token = jwt.sign(UserToken, req.app.get('superSecret'), {
                expiresIn: 43200
              });
              res.json({
                user: User,
                token: token
              });
            })
            .catch((error) => res.status(400).send(error));
        }
      })
      .catch((err) => {
        next(err);
      });
  },
  /**
   * Logout a user by setting the loggin to false
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject}
   */
  logout(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (!token) {
      let err;
      err = new Error('No token found');
      err.status = 500;
      throw err;
    } else {
      const OldUser = ExtractUser(token);
      Users.findById(OldUser.id)
        .then((User) => {
          return User
            .update({
              loggedin: false
            })
            .then(() => {
              res.json({
                message: 'Successfully logged out'
              });
            })
            .catch((err) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
  /**
   * Delete a user and its documents
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject}
   */
  delete(req, res, next) {
    if (req.decoded.id.toString() === req.params.id ||
      req.decoded.role === 3) {
      Users
        .findById(req.params.id)
        .then((User) => {
          User.destroy({
              where: {
                id: User.id
              }
            })
            .then(() => {
              res.sendStatus(204);
            })
            .catch((err) => {
              next(err);
            });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      res.status(403).json({
        error: 'Unauthorized Access'
      });
    }
  },
  GetDocs(req, res) {
    Documents.
    findAll({
        where: {
          UserId: req.params.id
        }
      })
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => {
        res.next(err);
      });
  },
  /**
   * Verify user by checking for token and logged in
   * 
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   */
  verify(req, res, next) {
    // Check for the token from the header or from the request body
    let token = req.body.token || req.headers['x-access-token'];

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
  }
};