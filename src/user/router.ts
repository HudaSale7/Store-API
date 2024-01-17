import { Router } from 'express';
import userController from './controller';

const router = Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
export default router;