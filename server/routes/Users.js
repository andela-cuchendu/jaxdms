(function() {
  'use strict';

  const Users = require('../controllers/Users');
  const express = require('express');
  const router = express.Router();

  router.post('/users', Users.create);
  router.get('/users/', Users.verify, Users.list);
  router.get('/users/data', Users.verify, Users.GetData);
  router.get('/users/:id', Users.verify, Users.GetUser);
  router.put('/users/:id', Users.verify, Users.UpdateUser);
  router.post('/users/login', Users.login);
  router.post('/users/logout', Users.logout);
  router.delete('/users/:id', Users.verify, Users.delete);
  router.get('/users/:id/documents', Users.GetDocs);

  module.exports = router;

}());
