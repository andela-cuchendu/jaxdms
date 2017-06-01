(function() {
  'use strict';

  const Roles = require('../controllers/Roles');
  const express = require('express');
  const router = express.Router();

  router.get('/roles', Roles.list);

  module.exports = router;

}());
