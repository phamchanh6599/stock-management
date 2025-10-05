import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app: Application = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/v1', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
  });
}

app.use('/api/v1', routes);

app.get('/', (_req, res) => {
  res.json({
    message: 'Directus API Gateway',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      auth: {
        signup: 'POST /api/v1/auth/signup',
        signin: 'POST /api/v1/auth/signin',
        refresh: 'POST /api/v1/auth/refresh',
      },
      products: {
        getAll: 'GET /api/v1/products',
        getById: 'GET /api/v1/products/:id',
      },
      checkout: {
        process: 'POST /api/v1/checkout',
        stockCheck: 'POST /api/v1/checkout/stock-check',
      },
    },
  });
});

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running at: http://localhost:${config.PORT.toString().padEnd(18)}`);
});

export default app;