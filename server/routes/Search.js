(function() {
  'use strict';

  const Search = require('../controllers/Search');
  const Users = require('../controllers/Users');
  const Documents = require('../controllers/Documents');
  const express = require('express');
  const router = express.Router();

  router.get('/search/documents', Users.verify, Search.FindDocuments);
  router.get('/search/users', Users.verify, Search.FindUsers);


  module.exports = router;

}());
