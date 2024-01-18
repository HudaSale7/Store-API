import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = Router();

router.get("/", isAuthenticated);
router.get("/:id", isAuthenticated);
router.post("/", isAuthenticated);
router.delete("/:id", isAuthenticated);
router.put("/:id", isAuthenticated);

export default router;