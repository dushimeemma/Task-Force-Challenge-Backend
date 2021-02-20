import { Router } from 'express';

import Auth from '../controllers/auth';
import { SignupSchema, LoginSchema } from '../middlewares/validations';

const router = Router();
const auth = new Auth();

router.post('/signup', SignupSchema, auth.signup);
router.post('/login', LoginSchema, auth.login);

export default router;
