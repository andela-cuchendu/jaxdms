const Roles = require('../models').Roles;

/**
 * Represents Roles
 */
module.exports = {
  /**
   * List all Roles. This can be done by
   * any user
   *
   * @param {any} req - Request Object from express
   * @param {any} res - Response Object from express
   * @returns {jsonObject} - This maybe error json Object
   */
  list(req, res) {
    let QueryOption = {};
    if (req.query.access !== undefined) {
      let access = parseInt(req.query.access, 10);
      if (access === 1) {
        QueryOption.where = { access: {
          $gt: 0,
        },
        };
      } else if (access === 0) {
        QueryOption.where = { access: {
          $lt: 0,
        },
        };
      }
    }
    Roles
      .findAll(QueryOption)
      .then(roles => res.status(200).send(roles))
      .catch(error => {
        res.status(400).send(error)});
  },
};
