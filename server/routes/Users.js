(function() {
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
  const Users = require('../controllers/Users');
  const express = require('express');
  const router = express.Router();

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
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
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
 *         description: User Object created
 *         schema:
 *           $ref: '#/definitions/User'
 */
  router.post('/users', Users.create);

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
 *         description: Users List
 *         schema:
 *           $ref: '#/definitions/Document'
 */
  router.get('/users/', Users.verify, Users.list);
  router.get('/users/data/data', Users.verify, Users.GetData);

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
 *         description: User
 *         schema:
 *           $ref: '#/definitions/User'
 */
  router.get('/users/:id', Users.verify, Users.GetUser);

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
 *       200:
 *         description: User Object updated
 *         schema:
 *           $ref: '#/definitions/User'
 */
  router.put('/users/:id', Users.verify, Users.UpdateUser);

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
 *       200:
 *         description: Logged in User
 *         schema:
 *           $ref: '#/definitions/User'
 */
  router.post('/users/login', Users.login);

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
 *         description: Logged out
 *         schema:
 *           $ref: '#/definitions/User'
 */
  router.post('/users/logout', Users.logout);

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
 *       200:
 *         description: user deleted successfully
 *         schema:
 *           $ref: '#/definitions/User'
 */
  router.delete('/users/:id', Users.verify, Users.delete);

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
 *       200:
 *         description: User Documents
 *         schema:
 *           type: object
 */
  router.get('/users/:id/documents', Users.GetDocs);

  module.exports = router;
}());

