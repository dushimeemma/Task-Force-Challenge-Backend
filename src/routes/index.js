import { Router } from 'express';

import todo from './todos';
import auth from './auth';

const router = Router();

router.use('/todos', todo);
router.use('/auth', auth);

export default router;
