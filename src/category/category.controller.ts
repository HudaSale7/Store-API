import { NextFunction } from "express";
import categoryService from "./category.service";
import { categoryScheme } from "./category.types";
import { validator } from "../utils/validator";
import { checkAuthorization } from "../utils/checkAuthorization";

const createCategory = async (req: any, res: any, next: NextFunction) => {
  try {
    const categoryName = req.body.name;
    const userId = req.userId;

    await checkAuthorization(userId, "CREATE_CATEGORY");

    validator(req, categoryScheme);
    const category = await categoryService.createCategory(categoryName, userId);
    
    res.status(200).json({category: category});
  } catch(error) {
     next(error);
  }
}

const deleteCategory = async (req: any, res: any, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const userId = req.userId;

    await checkAuthorization(userId, "DELETE_CATEGORY");

    const category = await categoryService.deleteCategory(Number(categoryId));
    
    res.status(200).json({category: category});
    } catch(error) {
        next(error);
  }
}

const updateCategory = async (req: any, res: any, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const userId = req.userId;
    const name = req.body.name

    await checkAuthorization(userId, "UPDATE_CATEGORY");
    validator(req, categoryScheme);

    const category = await categoryService.updateCategory({id: Number(categoryId), name: name});
    
    res.status(200).json({category: category});
  } catch(error) {
    next(error);
  }
}

const getAllCategory = async (req: any, res: any, next: NextFunction) => {
  try {
    const userId = req.userId;
    const categories = await categoryService.getAllCategory(userId);
    res.status(200).json({categories: categories});
  } catch(error) {
    next(error);
  }
}

const getCategory = async (req: any, res: any, next: NextFunction) => {
  try {
    const categoryId = req.params.id;

    const category = await categoryService.getCategory(Number(categoryId));
    res.status(200).json({category: category});
  } catch(error) {
    next(error);
  }
}

export default {createCategory, deleteCategory, updateCategory,getAllCategory, getCategory};