/* eslint-disable global-require */
(() => {
  const Documents = require('../models').Documents;
  const Error = require('./Tools').Error;

  module.exports = {
    /**
     * Creates Documents with access right.
     *
     * @param {any} req - Request Object from express
     * @param {any} res - Response Object from express
     * @returns {jsonObject} - This maybe error json Object
     */
    create: (req, res, next) => {
      const required = ['title', 'content'];
      if (!required.every(field => field in req.body)) {
        const err = new Error(
          'title and content fields are mandatory');
        err.status = 400;
        next(err);
      } else {
        return Documents
          .create({
            title: req.body.title,
            content: req.body.content,
            creator: req.body.creator || req.parcel.id,
            access: parseInt(req.body.access, 10) || -2,
            UserId: req.parcel.id,
          })
          .then((newDocument) => {
            res.status(201).json(newDocument);
          })
          .catch((err) => {
            next(err);
          });
      }
      return true;
    },
    /**
     * List all Documents based on their access.
     * It also checks if there is limit or offset query
     *
     * @param {any} req - Request Object from express
     * @param {any} res - Response Object from express
     * @returns {jsonObject} - This maybe error json Object
     */
    list(req, res) {
      let QueryOption = {
        where: {},
        limit: 0,
        offset: 0,
      };
      if (req.parcel.role === 3) {
        delete QueryOption.where;
      } else {
        QueryOption.where = {
          $or: [{
            access: {
              $in: [-1, req.parcel.role],
            },
          },
          {
            UserId: {
              $eq: req.parcel.id,
            },
          },
          ],
        };
      }
      QueryOption.offset = parseInt(req.query.offset, 10) || 0;
      QueryOption.limit = parseInt(req.query.limit, 10) || 0;
      if (QueryOption.offset < 1) {
        delete QueryOption.offset;
      }
      if (QueryOption.limit < 1) {
        delete QueryOption.limit;
      }
      return Documents
        .findAll(QueryOption)
        .then(documents => res.status(200).send(documents))
        .catch(error => res.status(400).send(error));
    },
    /**
     * Gets documents based on their access rights
     * and this could be public or role or own.
     *
     * @param {any} req - Request Object from express
     * @param {any} res - Response Object from express
     * @returns {jsonObject} - This maybe error json Object
     */
    GetShared(req, res) {
      const AccessParam = req.params.type;
      let query;
      switch (AccessParam) {
        case 'shar':
          query = {
            where: {
              access: -1,
            },
          };
          break;
        case 'own':
          query = {
            where: {
              UserId: parseInt(req.params.id, 10),
            },
          };
          break;
        case 'role':
          query = {
            where: {
              access: parseInt(req.parcel.role, 10),
            },
          };
          break;
        default:
          query = {
            where: {
              access: -1,
            },
          };
      }
      if (req.params.id == null) {
        return res.status(404).send({
          message: 'No ID found',
        });
      } else {
        const offset = parseInt(req.query.offset, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 0;
        if (offset > 0) {
          query.offset = offset;
        }
        if (limit > 0) {
          query.limit = limit;
        }
        return Documents
          .findAndCountAll(query)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Not Found',
              });
            }
            return res.status(200).send(document);
          })
          .catch(error => res.status(400).send(error));
      }
    },
    /**
     * Gets a document with ID. Only the account owner
     * or the admin can perfom this action.
     *
     * @param {any} req - Request Object from express
     * @param {any} res - Response Object from express
     * @returns {jsonObject} - This maybe error json Object
     */
    GetDocument(req, res) {
      if (req.params.id == null) {
        return res.status(404).send({
          message: 'No ID found',
        });
      } else {
        return Documents
          .findById(req.params.id)
          .then((document) => {
            if (!document) {
              return res.status(404).send({
                message: 'Document Not Found',
              });
            }
            if (document.access === req.parcel.id ||
            document.UserId === req.parcel.id || document.access === -1) {
              return res.status(200).send(document);
            } else {
              res.status(403).json({
                error: 'Unauthorized Access',
              });
            }
          })
          .catch(error => res.status(400).send(error));
      }
    },
    /**
     * Updates dpcument using the ID and parameters
     * provided. Also check for token and logged in
     *
     * @param {any} req - Request Object from express
     * @param {any} res - Response Object from express
     * @returns {jsonObject} - This maybe error json Object
     */
    UpdateDocument(req, res) {
      return Documents
        .findById(req.params.id)
        .then((document) => {
          if (!document) {
            return res.status(404).send({
              message: 'Document Not Found',
            });
          } else {
            if (req.parcel.id === document.UserId || (req.parcel.role === 3)) {
              return document
                .update(req.body, {
                  fields: Object.keys(req.body),
                })
                .then(() => {
                  return res.status(200).send(document);
                })
                .catch((error) => res.status(400).send(error));
            } else {
              res.status(403).json({
                error: 'Unauthorized Access',
              });
            }
          }
        })
        .catch((error) => { res.status(400).send(error); });
    },
    /**
     * Deletes a document using the ID
     * provided. Only Admin can do this
     *
     * @param {any} req - Request Object from express
     * @param {any} res - Response Object from express
     * @returns {jsonObject} - This maybe error json Object
     */
    DeleteDocument(req, res) {
      return Documents
        .findById(req.params.id)
        .then(document => {
          if (!document) {
            return res.status(404).send({
              message: 'Document Not Found',
            });
          } else {
            if (req.parcel.id === document.UserId || (req.parcel.role === 3)) {
              return document
                .destroy()
                .then(() => {
                  return res.sendStatus(204);
                })
                .catch((error) => res.status(400).send(error));
            } else {
              res.status(403).json({
                error: 'Unauthorized Access'
              });
            }
          }
        })
        .catch((error) => res.status(400).send(error));
    },
  };
})();
