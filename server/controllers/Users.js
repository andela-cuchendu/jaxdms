const bcrypt = require('bcryptjs');
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
   * @returns {responseObject} This maybe error json Object
   * or result json Object
   */
  create(req, res) {
    const required = ['username', 'firstname',
      'lastname', 'email', 'password',
    ];
    if (!required.every(field => field in req.body)) {
      const err = new Error(
        'All fields are mandatory');
      err.status = 400;
      res.json({
        message: err.message,
        success: false,
        errorObject: err,
        error: err.message,
        status: err.status,
      });
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
          password: bcrypt.hashSync(req.body.password, 10),
          role: req.body.role,
          loggedin: false,
        })
        .then((user) => {
          const TokenUser = _.pick(user, 'id', 'role', 'loggedin');
          const AppSecret = req.app.get('superSecret');
          const token = jwt.sign(TokenUser, AppSecret, {
            expiresIn: 43200,
          });
          user.password = null;
          res.status(201).json({
            user,
            token,
            success: true,
          });
        })
        .catch((err) => {
          if (err.name === 'SequelizeUniqueConstraintError') {
            err.status = 500;
            err.message = err.original.message;
          }
          res.json({
            message: err.message,
            success: false,
            errorObject: err,
            error: err.message,
            status: err.status,
          });
        });
    }
    return true;
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
        error: 'Unauthorized Access' });
    } else {
      let QueryOption = {
        limit: 0,
        offset: 0,
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
        .findAndCountAll(QueryOption)
        .then(users => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    }
    return true;
  },
  /**
   * Gets a user with ID. Only the account owner
   * or the admin can perfom this action.
   *
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @returns {jsonObject} - This maybe error json Object
   */
  GetData(req, res) {
    return Users
      .findById(req.decoded.id)
      .then(User => {
        if (!User) {
          return res.status(404).send({
            message: 'User Not Found'
          });
        }
        User.password = null;
        return res.status(200).send(User);
      })
      .catch(error => {
        res.status(400).send(error)});
  },
  /**
   * Gets a user with ID. Only the account owner
   * or the admin can perfom this action.
   *
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @returns {jsonObject} - This maybe error json Object
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
    return true;
  },
  /**
   * Deletes a User specified in the ID param.
   * This can only be done by the Admin
   *
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject} json Object
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
   * @returns {responseObject} json Object
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
   * @returns {responseObject} - json Object
   */
  login(req, res, next) {
    Users.find({
      where: {
        username: req.body.username,
      },
    })
      .then((User) => {
        let ValidPassword = null;
        let err;
        if (!User) {
          err = new Error('Authentication failed. Invalid login.');
          err.status = 404;
          throw err;
        } else {
          try {
            ValidPassword = ComparePassword(req.body.password, User.password);
          } catch (e) {
            let err;
            err = new Error(e);
            err.status = 404;
            throw err;
          }
          if (!ValidPassword) {
            err = new Error('Authentication failed. Invalid login.');
            err.status = 401;
              res.json({
                message: err.message,
                success: false,
                error: err,
                status: err.status,
              });
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
                  userData: User,
                  token: token
                });
              })
              .catch((error) => res.status(400).send(error));
          }
        }
      })
      .catch((err) => {
        res.json({
          message: err.message,
          success: false,
          error: err,
          status: err.status,
        });
      });
  },
  /**
   * Logout a user by setting the loggin to false
   *
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject} - json Object
   */
  logout(req, res, next) {
    const token = req.headers['x-access-token'];
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
   * @returns {responseObject} - json Object
   */
  delete(req, res, next) {
    if (req.decoded.id.toString() === req.params.id ||
      req.decoded.role === 3) {
      Users
        .findById(req.params.id)
        .then((User) => {
          User.destroy({
            where: {
              id: User.id,
            },
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
  /**
   * Gets document associated with the user
   *
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @param {any} next - Middleware
   * @returns {responseObject} - json Object
   */
  GetDocs(req, res) {
    Documents
    .findAll({
      where: {
        UserId: parseInt(req.params.id, 10),
      },
    })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json(err);
    });
  },
};
