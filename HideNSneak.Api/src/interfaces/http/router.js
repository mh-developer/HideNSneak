const { Router } = require('express');
const cors = require('cors');
const compression = require('compression');
const modules = require('./modules');
const swagger = require('./swagger');
const middlewares = require('./middlewares');

const router = Router();
const apiRouter = Router();

middlewares.initAuthFlow();

apiRouter
  .use(
    cors({
      origin: [`${process.env.ORIGINS || '*'}`],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Origin',
        'X-Requested-With',
        'Accept'
      ]
    })
  )
  .use(compression());

apiRouter.use('/health', modules.health);
apiRouter.use('/auth', modules.auth);
apiRouter.use('/locations', middlewares.requiredAuth, modules.locations);
apiRouter.use('/users', middlewares.requiredAuth, modules.users);
apiRouter.use('/rooms' /* , middlewares.requiredAuth */, modules.rooms);

router.use('/api/v1', apiRouter);
router.use(swagger());

module.exports = router;
