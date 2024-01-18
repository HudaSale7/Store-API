import { NextFunction } from "express";
import { Product, productScheme } from "./product.types";
import { checkAuthorization } from "../utils/checkAuthorization";
import { validator } from "../utils/validator";
import productService from "./product.service";

const createdProduct = async (req: any, res: any, next: NextFunction) => {
  try {
    const userId = req.userId;
    const categoryId = req.body.categoryId;
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };

    await checkAuthorization(userId, "CREATE_PRODUCT");

    validator(req, productScheme);

    const newProduct = await productService.createProduct(product, userId, Number(categoryId));

    res.status(200).json({product: newProduct});
  } catch(error) {
    next(error);
  }
};


const deleteProduct = async (req: any, res: any, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const userId = req.userId;

    await checkAuthorization(userId, "DELETE_PRODUCT");

    const product = await productService.deleteProduct(Number(productId));

    res.status(200).json({product: product});
  } catch(error) {
    next(error);
  }
};

const updateProduct = async (req: any, res: any, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const userId = req.userId;

    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };

    await checkAuthorization(userId, "UPDATE_PRODUCT");

    validator(req, productScheme);

    const newProduct = await productService.updateProduct(product, Number(productId));

    res.status(200).json({product: newProduct});
  } catch(error) {
        next(error);
  }
};

const getProduct = async (req: any, res: any, next: NextFunction) => {
  try {
    const productId = req.params.id;

    const product = await productService.getProduct(Number(productId));
    res.status(200).json({product: product});

  } catch(error) {
    next(error);
  }
};

const getAllProduct = async (req: any, res: any, next: NextFunction) => {
  try {
    const userId = req.userId;

    const products = await productService.getAllProduct(userId);
    res.status(200).json({products: products});
  } catch(error) {
    next(error);
  }
};

export default {createdProduct, deleteProduct, updateProduct, getAllProduct, getProduct};