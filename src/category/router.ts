import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = Router();

router.get("/", isAuthenticated);
export default router;