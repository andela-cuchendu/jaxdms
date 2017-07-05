import Middleware from '../controllers/Middleware';

const Documents = require('../controllers/Documents');
const express = require('express');

const router = express.Router();

(() => {
  /**
   * @swagger
   * definition:
   *   Document:
   *     type: object
   *     required:
   *        - title
   *        - content
   *        - access
   *        - UserId
   *     properties:
   *        title:
   *           type: string
   *        content:
   *           type: string
   *        access:
   *            type: string
   *        UserId:
   *            type: number
   */

/**
 * @swagger
 * /api/documents:
 *   post:
 *     tags:
 *       - Documents
 *     description: Creates a document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: title
 *         description: document title
 *         in: form
 *         required: true
 *         type: string
 *       - name: content
 *         description: document content
 *         in: form
 *         required: true
 *         type: string
 *       - name: access
 *         description: document access role
 *         in: form
 *         required: true
 *         type: number
 *       - name: UserId
 *         description: document creator ID
 *         in: form
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Document object created
 *         schema:
 *           $ref: '#/definitions/Document'
 *         examples:
 *           application/json: { id: 38, title: "T-shirt", content: "example" }
 */
  router.post('/', Middleware.verifyDoc, Documents.create);

/**
 * @swagger
 * /api/documents:
 *   get:
 *     tags:
 *       - Documents
 *     description: Gets list of documents
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
 *         description: Document list created
 *         schema:
 *           $ref: '#/definitions/Document'
 *         examples:
 *           application/json: [{ id: 38, title: "T-shirt", content: "example" }]
 */
  router.get('/', Middleware.verifyDoc, Documents.list);

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     tags:
 *       - Documents
 *     description: Gets a document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: request x-access-token
 *         in: header
 *         required: true
 *         type: string
 *       - name: id
 *         description: Document ID
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Document retrieved.
 *         schema:
 *           $ref: '#/definitions/Document'
 *         examples:
 *           application/json: { id: 38, title: "T-shirt", content: "example" }
 */
  router.get('/:id', Middleware.verifyDoc, Documents.GetDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   put:
 *     tags:
 *       - Documents
 *     description: Updates a document
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
 *       - name: title
 *         description: document title
 *         in: form
 *         required: true
 *         type: string
 *       - name: content
 *         description: document content
 *         in: form
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Document object updated
 *         schema:
 *           $ref: '#/definitions/Document'
 *         examples:
 *           application/json: { id: 38, title: "T-shirt", content: "example" }
 */
  router.put('/:id', Middleware.verifyDoc, Documents.UpdateDocument);

/**
 * @swagger
 * /api/documents/{id}:
 *   delete:
 *     tags:
 *       - Documents
 *     description: Deletes a document
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
 *       204:
 *         description: Document deleted successfully
 *         schema:
 *           $ref: '#/definitions/Document'
 *         examples:
 *           application/json: {}
 */
  router.delete('/:id', Middleware.verifyDoc, Documents.DeleteDocument);

/**
 * @swagger
 * /api/documents/{id}/{type}:
 *   get:
 *     tags:
 *       - Documents
 *     description: Gets a documents base on role
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
 *       - name: type
 *         description: document type
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Document list created
 *         schema:
 *           $ref: '#/definitions/Document'
 *         examples:
 *           application/json: [{ id: 38, title: "T-shirt", content: "example" }]
 */
  router.get('/:id/:type', Middleware.verifyDoc, Documents.GetPublic);
})();
export default router;
