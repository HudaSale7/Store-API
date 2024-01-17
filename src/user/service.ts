import { prisma } from "../utils/db";

const createUser = async (user: {name: string, email: string, password: string}) => {
  const createdUser = prisma.user.create({
    data: user
  });
  return createdUser;
}

const findUser = async (email: string) => {
  const user = prisma.user.findUnique({
    where: {
        email: email
    }
  });
  return user;
}

export default {createUser, findUser};

