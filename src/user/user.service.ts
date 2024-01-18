import { prisma } from "../utils/db";
import { errorFactory } from "../utils/errorFactory";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const register = async (user: {name: string, email: string, password: string}) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
        email: user.email
    }
  });
  if(isUserExist) throw errorFactory("User is Exist", 409);

  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;

  const createdUser = await prisma.user.create({ data: user });

  if (!createdUser) throw errorFactory("Server Error");

  const token = createToken(createdUser.email, createdUser.id);

  return {userName: createdUser.name, token};
}


const login = async (loggedUser: {email: string, password: string}) => {
  const user = await prisma.user.findUnique({
    where: {
        email: loggedUser.email
    }
  });
  if (!user) throw errorFactory("Wrong Email", 401);

  const isPasswordCorrect = await bcrypt.compare(loggedUser.password, user.password);
  if (!isPasswordCorrect) throw errorFactory("Wrong Password", 401);

  const token = createToken(user.email, user.id);

  return {userName: user.name, token};
}

const createToken = (email: string, id: number) => {
  return jwt.sign({
      email: email,
      userId: id
  }, 
  process.env.SECRET_KEY as string
  )
}

export default {login, register};

