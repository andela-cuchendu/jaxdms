import swaggerJSDoc from 'swagger-jsdoc';

require('dotenv').config();

const hostUrl = process.env.NODE_ENV === 'production'
  ? 'jaxdms.herokuapp.com'
  : 'localhost:3444';
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Jax Document Management System API',
    version: '1.0.0',
    description: 'API documentation to create, manage and edit documents',
  },
  host: hostUrl,
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [
    './server/routes/Documents.js',
    './server/routes/Users.js',
    './server/routes/Search.js',
    './server/routes/Roles.js',
  ],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const swagger = (router) => {
  router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Cntrol-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Cache-Control', 'Pragma, Origin, Authorization, Content-Type, X-Requested-with');  //eslint-disable-line
    res.header('Access-Control-Allow-Headers', 'GET, PUT, POST, OPTIONS');
    res.send(swaggerSpec);
  });
};

export default swagger;
