import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import productController from './product.controller';

const router = Router();

router.get("/", isAuthenticated, productController.getAllProduct);
router.get("/:id", isAuthenticated, productController.getProduct);

router.post("/", isAuthenticated, productController.createdProduct);
router.delete("/:id", isAuthenticated, productController.deleteProduct);
router.put("/:id", isAuthenticated, productController.updateProduct);

export default router;