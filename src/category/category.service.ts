import { prisma } from "../utils/db"
import { errorFactory } from "../utils/errorFactory";

const createCategory = async ( categoryName: string, userId: number) => {
  const createdCategory = await prisma.category.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        name: categoryName,
      },
  });

  if(!createdCategory) throw errorFactory("Server Error");

  return createdCategory;
};

const deleteCategory = async (id: number) => {
  const deletedCategory = await prisma.category.delete({
      where: {
          id: id,
      },
  });

  if(!deletedCategory) throw errorFactory("Server Error");
  return deletedCategory;
}

const updateCategory = async (category: {id: number, name: string}) => {
  const updatedCategory = await prisma.category.update({
    where: {
      id: category.id
    },
    data: {
      name: category.name
    }
  });

  if(!updatedCategory) throw errorFactory("Server Error");
  return updatedCategory;
}

const getAllCategory = async (userId: number) => {
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    }
  });

  if(!categories) throw errorFactory("Server Error");
  return categories;
}

const getCategory = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    }
  });

  if(!category) throw errorFactory("Server Error");
  return category;
}

export default { createCategory, deleteCategory, updateCategory, getAllCategory, getCategory }