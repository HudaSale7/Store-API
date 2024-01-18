import { Router } from 'express';
import userController from './user.controller';

const router = Router();

router.post('/sign-up', userController.register);
router.post('/login', userController.login);
export default router;