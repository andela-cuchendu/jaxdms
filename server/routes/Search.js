import Middleware from '../controllers/Middleware';

const Search = require('../controllers/Search');
const express = require('express');

const router = express.Router();
(() => {
  /**
   * @swagger
   * /api/search/documents?q={documentTitle}:
   *    get:
   *      description: Finds a document by Title
   *      tags:
   *        - Search
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: token
   *          in: header
   *          description: request x-access-token
   *          required: true
   *          type: string
   *        - name: q
   *          in: path
   *          description: title of document
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: Document
   *          schema:
   *            type: object
   */
  router.get('/search/documents', Middleware.verifyUser, Search.FindDocuments);

  /**
   * @swagger
   * /api/search/users?q={username}:
   *    get:
   *      description: Finds a user by username
   *      tags:
   *        - Search
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: token
   *          in: header
   *          description: request x-access-token
   *          required: true
   *          type: string
   *        - name: q
   *          in: path
   *          description: username of a registred user
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: user
   *          schema:
   *            type: object
   */
  router.get('/search/users', Middleware.verifyUser, Search.FindUsers);
})();
export default router;
