(function () {
  'use strict';

  const Documents = require('../controllers/Documents');
  const express = require('express');
  const router = express.Router();

  router.post('/documents', Documents.verify, Documents.create);
  router.get('/documents', Documents.verify, Documents.list);
  router.put('/documents/:id', Documents.verify, Documents.UpdateDocument);
  router.delete('/documents/:id', Documents.verify, Documents.DeleteDocument);
  router.get('/documents/:id', Documents.verify, Documents.GetDocument);
  router.get('/documents/:id/:type', Documents.verify, Documents.GetShared);
  module.exports = router;

}());