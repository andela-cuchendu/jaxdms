const Roles = require('../controllers/Roles');
const express = require('express');

const router = express.Router();
(() => {
/**
 * @swagger
 * definition:
 *   Roles:
 *     properties:
 *       title:
 *         type: string
 *       acess:
 *         type: string
 */


/**
 * @swagger
 * /api/roles:
 *   get:
 *     tags:
 *       - Roles
 *     description: Returns all roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of roles
 *         schema:
 *           $ref: '#/definitions/Roles'
 */
  router.get('/roles', Roles.list);
})();
export default router;
