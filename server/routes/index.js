import express from 'express';
import Roles from './Roles';
import Users from './Users';
import Documents from './Documents';
import Search from './Search';


const router = express.Router();
(() => {
  router.get('/api', (req, res) => {
    res.send('Jax Document management system');
  });

  router.use('/api/users', Users);
  router.use('/api/documents', Documents);
  router.use('/api/roles', Roles);
  router.use('/api/search', Search);
})();
export default router;
