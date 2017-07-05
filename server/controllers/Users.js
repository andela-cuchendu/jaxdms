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
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @param {Object} next - Middleware
   * @returns {Object} This maybe error json Object
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
          const newUser = user.dataValues;
          delete newUser.password;
          delete newUser.loggedin;
          delete newUser.createdAt;
          delete newUser.updatedAt;
          res.status(201).json({
            newUser,
            token,
            success: true,
          });
        })
        .catch((err) => {
          const newErr = err;
          if (newErr.name === 'SequelizeUniqueConstraintError') {
            newErr.status = 500;
            newErr.message = err.original.message;
          }
          res.json({
            message: newErr.message,
            success: false,
            errorObject: newErr,
            error: newErr.message,
            status: newErr.status,
          });
        });
    }
    return true;
  },

  /**
   * List all users. This can be done only by Admin
   * It also checks if there is limit or offset query
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @returns {Object} - This maybe error json Object
   */
  list(req, res) {
    if (req.decoded.role !== 3) {
      res.status(403).json({
        error: 'Unauthorized Access' });
    } else {
      const QueryOption = {
        limit: 0,
        offset: 0,
        order: '"id" DESC',
        attributes: ['id', 'firstname', 'lastname', 'email',
          'username', 'role', 'createdAt'],
      };
      QueryOption.offset = parseInt(req.query.offset, 10) || 0;
      QueryOption.limit = parseInt(req.query.limit, 10) || 0;
      const offset = QueryOption.offset;
      const limit = QueryOption.limit;
      if (QueryOption.offset < 1) {
        delete QueryOption.offset;
      }
      if (QueryOption.limit < 1) {
        delete QueryOption.limit;
      }
      return Users
        .findAndCountAll(QueryOption)
        .then((users) => {
          const newUsers = users;
          newUsers.offset = offset;
          newUsers.limit = limit;
          res.status(200).send(users);
        })
        .catch(error => res.status(400).send(error));
    }
    return true;
  },
  /**
   * Gets a user with ID. Only the account owner
   * or the admin can perfom this action.
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @returns {Object} - This maybe error json Object
   */
  GetData(req, res) {
    return Users
      .findById(req.decoded.id)
      .then((User) => {
        if (!User) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        const newUser = User.dataValues;
        delete newUser.password;
        delete newUser.loggedin;
        delete newUser.createdAt;
        delete newUser.updatedAt;
        return res.status(200).send(newUser);
      })
      .catch((error) => { res.status(400).send(error); });
  },
  /**
   * Gets a user with ID. Only the account owner
   * or the admin can perfom this action.
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @returns {Object} - This maybe error json Object
   */
  GetUser(req, res) {
    if (req.decoded.id.toString() === req.params.id ||
      req.decoded.role === 3) {
      if (req.params.id == null) {
        res.status(404).send({
          message: 'No ID found',
        });
      } else {
        return Users
          .findById(req.params.id)
          .then((User) => {
            if (!User) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            const newUser = User.dataValues;
            delete newUser.password;
            delete newUser.loggedin;
            delete newUser.createdAt;
            delete newUser.updatedAt;
            return res.status(200).send(User);
          })
          .catch(error => res.status(400).send(error));
      }
    } else {
      res.status(403).json({
        error: 'Unauthorized Access',
      });
    }
    return true;
  },
  /**
   * Deletes a User specified in the ID param.
   * This can only be done by the Admin
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @param {Object} next - Middleware
   * @returns {Object} json Object
   */
  DeleteUser(req, res, next) {
    if (req.decoded.id === req.params.id ||
      req.decoded.role.title === 'admin') {
      Users.findOneAndRemove({
        id: req.params.id,
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
        error: 'Unauthorized Access',
      });
    }
  },

  /**
   * Updates user using the ID and parameters
   * provided. Also check for token and logged in
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @returns {Object} json Object
   */
  UpdateUser(req, res) {
    if (req.decoded.id.toString() === req.params.id ||
      req.decoded.role === 3) {
      Users
        .findById(req.params.id)
        .then((User) => {
          if (!User) {
            res.status(404).send({
              message: 'User Not Found',
            });
          } else {
            delete req.body.email;
            delete req.body.username;
            return User
              .update(req.body, {
                fields: Object.keys(req.body),
              })
              .then(() => {
                const newUser = User.dataValues;
                delete newUser.password;
                delete newUser.loggedin;
                delete newUser.updatedAt;
                return res.status(200).send(newUser);
              })
              .catch(error => res.status(400).send(error));
          }
          return true;
        })
        .catch(error => res.status(400).send(error));
    } else {
      res.status(403).json({
        error: 'Unauthorized Access',
      });
    }
    return true;
  },
  /**
   * Login a user and retrun a token for the user
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @returns {Object} - json Object
   */
  login(req, res) {
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
            let newerr = null;
            newerr = new Error(e);
            newerr.status = 404;
            throw newerr;
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
                loggedin: true,
              })
              .then((user) => {
                const newUser = user.dataValues;
                delete newUser.password;
                delete newUser.updatedAt;
                const UserToken = {
                  id: newUser.id,
                  role: newUser.role,
                  loggedin: newUser.loggedin,
                };
                const token = jwt.sign(UserToken, req.app.get('superSecret'), {
                  expiresIn: 43200,
                });
                delete newUser.loggedin;
                res.json({
                  userData: newUser,
                  token,
                });
              })
              .catch(error => res.status(400).send(error));
          }
        }
        return true;
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
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @param {Object} next - Middleware
   * @returns {Object} - json Object
   */
  logout(req, res) {
    const token = req.headers['x-access-token'];
    if (!token) {
      let err = null;
      err = new Error('No token found');
      err.status = 404;
      throw err;
    } else {
      const OldUser = ExtractUser(token);
      Users.findById(OldUser.id)
        .then((User) => {
          User
            .update({
              loggedin: false,
            })
            .then(() => {
              res.json({
                message: 'Successfully logged out',
              });
            })
            .catch((err) => {
              res.json({ err });
            });
        })
        .catch((err) => {
          res.json({ err });
        });
    }
  },
  /**
   * Delete a user and its documents
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @param {Object} next - Middleware
   * @returns {Object} - json Object
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
        error: 'Unauthorized Access',
      });
    }
  },
  /**
   * Gets document associated with the user
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @param {Object} next - Middleware
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
