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

  // Lists all routes
  router.use('/api', Users);
  router.use('/api', Documents);
  router.use('/api', Roles);
  router.use('/api', Search);
  // module.exports = router;
})();
export default router;
