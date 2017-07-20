const Documents = require('../models').Documents;
const Error = require('./Tools').Error;
const NotFoundResponse = require('./Tools').NotFoundResponse;

(() => {
  module.exports = {
    /**
     * Creates Documents with access right.
     *
     * @param {Object} req - Request Object from express
     * @param {Object} res - Response Object from express
     * @returns {Object} - This maybe error json Object
     */
    createDocument: (req, res) => {
      const required = ['title'];
      if (!required.every(field => field in req.body)) {
        const err = new Error(
          'title and content fields are mandatory');
        err.status = 400;
        return err;
      } else {
        return Documents
          .create({
            title: req.body.title,
            content: req.body.content || '',
            creator: req.body.creator || req.parcel.id,
            access: parseInt(req.body.access, 10) || -2,
            UserId: req.parcel.id,
          })
          .then((newDocument) => {
            res.status(201).json(newDocument);
          })
          .catch(err => err);
      }
      return true;
    },
    /**
     * List all Documents based on their access.
     * It also checks if there is limit or offset query
     *
     * @param {Object} req - Request Object from express
     * @param {Object} res - Response Object from express
     * @returns {array} - Array of document objects
     */
    listDocuments(req, res) {
      const QueryOption = {
        where: {},
        limit: 0,
        offset: 0,
        order: '"id" DESC',
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
      const offset = QueryOption.offset;
      const limit = QueryOption.limit;
      if (QueryOption.offset < 1) {
        delete QueryOption.offset;
      }
      if (QueryOption.limit < 1) {
        delete QueryOption.limit;
      }
      return Documents
        .findAll(QueryOption)
        .then((documents) => {
          const newDocument = { documents };
          newDocument.limit = limit;
          newDocument.offset = offset;
          res.status(200).send(newDocument);
        })
        .catch(error => res.status(400).send(error));
    },
    /**
     * Gets documents based on their access rights
     * and this could be public or role or own.
     *
     * @param {Object} req - Request Object from express
     * @param {Object} res - Response Object from express
     * @returns {array} - Array of document objects
     */
    getPublicDocuments(req, res) {
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
      query.order = '"id" DESC';
      if (req.params.id == null) {
        return NotFoundResponse(res, 'No ID found');
      }
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
            return NotFoundResponse(res, 'Document not found');
          }
          return res.status(200).send(document);
        })
        .catch(error => res.status(400).send(error));
    },
    /**
     * Gets a document with ID. Only the account owner
     * or the admin can perfom this action.
     *
     * @param {Object} req - Request Object from express
     * @param {Object} res - Response Object from express
     * @returns {Object} - document object
     */
    getSingleDocument(req, res) {
      if (req.params.id === null) {
        return NotFoundResponse(res, 'No ID found');
      }
      return Documents
        .findById(req.params.id)
        .then((document) => {
          if (!document) {
            return NotFoundResponse(res, 'Document not found');
          }
          if (document.access === req.parcel.id ||
          document.UserId === req.parcel.id || document.access === -1) {
            return res.status(200).send(document);
          }
          return res.status(403).json({
            error: 'Unauthorized Access',
          });
        })
        .catch(error => res.status(400).send(error));
    },
    /**
     * Updates dpcument using the ID and parameters
     * provided. Also check for token and logged in
     *
     * @param {Object} req - Request Object from express
     * @param {Object} res - Response Object from express
     * @returns {Object} - object of the updated document
     */
    updateDocument(req, res) {
      return Documents
        .findById(req.params.id)
        .then((document) => {
          if (!document) {
            return NotFoundResponse(res, 'Document not found');
          }
          if (req.parcel.id === document.UserId || (req.parcel.role === 3)) {
            return document
              .update(req.body, {
                fields: Object.keys(req.body),
              })
              .then(() => res.status(200).send(document))
              .catch(error => res.status(400).send(error));
          }
          return res.status(403).json({
            error: 'Unauthorized Access',
          });
        })
        .catch((error) => { res.status(400).send(error); });
    },
    /**
     * Deletes a document using the ID
     * provided. Only Admin can do this
     *
     * @param {Object} req - Request Object from express
     * @param {Object} res - Response Object from express
     * @returns {Object} - response object containing status code
     * and message
     */
    deleteDocument(req, res) {
      return Documents
        .findById(req.params.id)
        .then((document) => {
          if (!document) {
            return NotFoundResponse(res, 'Document not found');
          } else {
            if (req.parcel.id === document.UserId || (req.parcel.role === 3)) {
              return document
                .destroy()
                .then(() => res.sendStatus(204))
                .catch(error => res.status(400).send(error));
            }
            return res.status(403).json({
              error: 'Unauthorized Access',
            });
          }
          return true;
        })
        .catch(error => res.status(400).send(error));
    },
  };
})();
