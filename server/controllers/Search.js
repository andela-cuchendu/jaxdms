const Users = require('../models').Users;
const Documents = require('../models').Documents;

/**
 * Represents Search
 */
module.exports = {
  /**
   * Find documents. This can be done any
   * user and result returned is based on
   * access rights
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @returns {Object} - This maybe error json Object
   */
  FindDocuments(req, res) {
    const query = req.query.q.trim();

    if (query != null && query.length > 0) {
      const offset = parseInt(req.query.offset, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 0;
      let DocumentAccess = [-1, req.decoded.role];
      if (req.decoded.role === 3) {
        DocumentAccess = [-1, -2, 1, 2, 3];
      }
      const QueryOption = {
        where: {
          $and: [{
            $or: [{
              title: {
                $iLike: `%${query}%`,
              },
            },
            {
              content: {
                $iLike: `%${query}%`,
              },
            },
            ],
          },
          {
            $or: {
              access: {
                $in: DocumentAccess,
              },
            },
          },
          ],
        },
        limit,
        offset,
      };

      if (QueryOption.offset < 1) {
        delete QueryOption.offset;
      }
      if (QueryOption.limit < 1) {
        delete QueryOption.limit;
      }

      return Documents
        .findAll(QueryOption)
        .then((documents) => {
          if (!documents) {
            return res.status(404).send({
              message: 'No Document Found',
            });
          }
          return res.status(200).send(documents);
        })
        .catch(error => res.status(400).send(error));
    }
    return res.status(404).send({
      message: 'No Query found',
    });
  },
  /**
   * Find Users. This can be done any
   * only admin
   *
   * @param {Object} req - Request Object from express
   * @param {Object} res - Response Object from express
   * @returns {Object} - This maybe error json Object
   */
  FindUsers(req, res) {
    const query = req.query.q.trim();
    if (query != null && query.length > 0) {
      const offset = parseInt(req.query.offset, 10) || 0;
      const limit = parseInt(req.query.limit, 10) || 0;
      const QueryOption = {
        limit,
        offset,
        where: {
          username: {
            $ilike: `%${query}%`,
          },
        },
      };
      if (QueryOption.offset < 1) {
        delete QueryOption.offset;
      }
      if (QueryOption.limit < 1) {
        delete QueryOption.limit;
      }
      Users.findAll(QueryOption)
        .then((users) => {
          if (!users) {
            return res.status(404).send({
              message: 'No Users Found',
            });
          }
          return res.status(200).send(users);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  },
};
