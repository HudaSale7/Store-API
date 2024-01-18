import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import categoryController from "./category.controller"; 

const router = Router();

router.get("/:id", isAuthenticated, categoryController.getCategory);
router.get("/", isAuthenticated, categoryController.getAllCategory);

router.post("/", isAuthenticated, categoryController.createCategory);
router.delete("/:id", isAuthenticated, categoryController.deleteCategory);
router.put("/:id", isAuthenticated, categoryController.updateCategory);

export default router;