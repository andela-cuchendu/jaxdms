(function () {
  'use strict';

  const Documents = require('../controllers/Documents');
  const express = require('express');
  const router = express.Router();

  router.post('/documents', Documents.verify, Documents.create);
  router.get('/documents', Documents.verify, Documents.list);
  router.get('/documents/:id', Documents.verify, Documents.GetDocument);
  router.put('/documents/:id', Documents.verify, Documents.UpdateDocument);
  router.delete('/documents/:id', Documents.verify, Documents.DeleteDocument);
  module.exports = router;

}());