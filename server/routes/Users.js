import Middleware from '../controllers/Middleware';

const Users = require('../controllers/Users');
const express = require('express');

const router = express.Router();
(() => {
  /**
   * @swagger
   * definition:
   *   User:
   *     type: object
   *     required:
   *        - firstname
   *        - lastname
   *        - username
   *        - email
   *        - password
   *        - role
   *     properties:
   *        firstname:
   *           type: string
   *        lastname:
   *           type: string
   *        username:
   *            type: string
   *        email:
   *            type: string
   *        password:
   *            type: string
   *        role:
   *            type: number
   */

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstname
 *         description: firstname of user
 *         in: form
 *         required: true
 *         type: string
 *       - name: lastname
 *         description: firstname of user
 *         in: form
 *         required: true
 *         type: string
 *       - name: username
 *         description: username of user
 *         in: form
 *         required: true
 *         type: string
 *       - name: email
 *         description: email of user
 *         in: form
 *         required: true
 *         type: string
 *       - name: password
 *         description: password of user
 *         in: form
 *         required: true
 *         type: string
 *       - name: role
 *         description: user role
 *         in: form
 *         required: true
 *         type: number
 *     responses:
 *       201:
 *         description: User object created
 *         schema:
 *           $ref: '#/definitions/User'
 *         examples:
 *           application/json: { id: 38, firstname: "T-shirt",
 * lastname: "example", username: "uname", createdAt: "189027897" }
 */
  router.post('/', Users.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Gets list of users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Array of User object
 *         schema:
 *           $ref: '#/definitions/User'
 *         examples:
 *           application/json: [{ id: 38, firstname: "T-shirt",
 * lastname: "example", username: "uname", createdAt: "189027897" }]
 */
  router.get('/', Middleware.verifyUser, Users.listUsers);
  router.get('/data/data', Middleware.verifyUser, Users.getUserData);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     description: Gets User by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Returns User object
 *         schema:
 *           $ref: '#/definitions/User'
 *         examples:
 *           application/json: { id: 38, firstname: "T-shirt",
 * lastname: "example", username: "uname", createdAt: "189027897" }
 */
  router.get('/:id', Middleware.verifyUser, Users.getUser);

  /**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     description: Updates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *         type: number
 *       - name: firstname
 *         description: user firstname
 *         in: form
 *         required: false
 *         type: string
 *       - name: lastname
 *         description: user lastname
 *         in: form
 *         required: false
 *         type: string
 *       - name: password
 *         description: user password
 *         in: form
 *         required: false
 *         type: string
 *     responses:
 *       201:
 *         description: User object updated
 *         schema:
 *           $ref: '#/definitions/User'
 *         examples:
 *           application/json: { id: 38, firstname: "T-shirt",
 * lastname: "example", username: "uname", createdAt: "189027897" }
 */
  router.put('/:id', Middleware.verifyUser, Users.updateUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: Signs in a user
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: username
 *         description: username
 *         in: form
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: form
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Returns User object on successful login
 *         schema:
 *           $ref: '#/definitions/User'
 *         examples:
 *           application/json: {userData: { id: 38, firstname: "T-shirt",
 * lastname: "example", username: "uname", createdAt: "189027897" },
 * token: {JGJGJhjfjh78585rJMK78R7DGD}}
 */
  router.post('/login', Users.login);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     description: Signs out a user
 *     tags:
 *      - Users
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User logout
 *         schema:
 *           $ref: '#/definitions/User'
 *         examples:
 *           application/json: {}
 */
  router.post('/logout', Users.logout);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     description: Deletes a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: user id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       204:
 *         description: User object deleted
 *         schema:
 *           $ref: '#/definitions/User'
 *         examples:
 *           application/json: {}
 */
  router.delete('/:id', Middleware.verifyUser, Users.deleteUser);

/**
 * @swagger
 * /api/users/{id}/documents:
 *   get:
 *     tags:
 *       - Users
 *     description: Lists users document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: document id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       201:
 *         description: User documents
 *         examples:
 *           application/json: [{ id: 38, title: "T-shirt", content: "example" }]
 */
  router.get('/:id/documents', Users.getUserDocuments);
})();
export default router;
