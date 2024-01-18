import { prisma } from "../utils/db"
import { errorFactory } from "../utils/errorFactory";
import { Product } from "./product.types"

const createProduct = async (product: Product, userId: number, categoryId: number) => {
  const createdProduct = await prisma.product.create({
    data: {
      user:{
        connect: {
            id: userId,
          },
        },
      category: {
        connect: {
            id: categoryId,
          },
        },
      name: product.name,
      price: product.price,
      description: product.description,
    }
  });

  if(!createdProduct) throw errorFactory("Server Error");
  return createdProduct;
}

const deleteProduct = async (productId: number) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id: productId,
    }
  });

  if(!deletedProduct) throw errorFactory("Server Error");
  return deletedProduct;
}

const updateProduct = async (product: Product, productId: number) => {
  const updatedProduct = await prisma.product.update({
    where: {
        id: productId,
    },
    data: product
  });

  if(!updatedProduct) throw errorFactory("Server Error");
  return updatedProduct;
}

const getProduct = async (productId: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: true,
    }
  });

  if(!product) throw errorFactory("Server Error");
  return product;
}

const getAllProduct = async (userId: number) => {
  const products = await prisma.product.findMany({
    where:{
      userId: userId,
    },
    include: {
      category: true,
    }
  });

  if(!products) throw errorFactory("Server Error");
  return products;
}

export default {createProduct, deleteProduct, updateProduct, getAllProduct, getProduct};