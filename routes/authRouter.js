import { Router } from 'express';
import rateLimiter from 'express-rate-limit';
import { login, logout, register } from '../controllers/authController.js';
import {
	validateRegisterInput,
	validateLoginInput,
} from '../middlewares/validationMiddleware.js';

const router = Router();

const apiLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000,
	max: 15,
	message: { message: 'IP rate limit exceeded, retry in 15 minutes' },
});

router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;
