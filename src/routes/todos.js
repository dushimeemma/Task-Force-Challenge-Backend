import { Router } from 'express';

import Todo from '../controllers/todo';
import CheckToken from '../middlewares/auth';
import { TodoSchema } from '../middlewares/validations';

const router = Router();
const todo = new Todo();
const token = new CheckToken();

router.get('/', todo.getAll);
router.post('/', TodoSchema, token.checkUser, todo.create);
router.get('/:id', todo.getOne);
router.put('/:id', token.checkUser, todo.update);
router.delete('/:id', token.checkUser, todo.delete);

export default router;
