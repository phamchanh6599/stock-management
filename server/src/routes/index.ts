import { Router } from 'express';
import { handleSignUp, handleSignIn, handleRefreshToken } from '../controllers/auth.controller';
import { handleGetAllProducts, handleGetProductById } from '../controllers/product.controller';
import { handleProcessCheckout, handleCheckStock } from '../controllers/checkout.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validate, signUpSchema, signInSchema, checkoutSchema } from '../middleware/validation.middleware';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

router.post('/auth/signup', validate(signUpSchema), handleSignUp);
router.post('/auth/signin', validate(signInSchema), handleSignIn);
router.post('/auth/refresh', handleRefreshToken);

router.get('/products', handleGetAllProducts);
router.get('/products/:id', handleGetProductById);

router.post('/checkout', authenticateToken, validate(checkoutSchema), handleProcessCheckout);
router.post('/checkout/stock-check', authenticateToken, validate(checkoutSchema), handleCheckStock);

export default router;